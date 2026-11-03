import json
import unittest
from unittest.mock import patch

from update_instagram import fetch_instagram_media, parse_instagram_media, write_json_if_changed


class FakeResponse:
    def __init__(self, payload):
        self.payload = json.dumps(payload).encode("utf-8")

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def read(self):
        return self.payload


class InstagramMediaTests(unittest.TestCase):
    def test_parse_keeps_only_safe_recent_image_posts(self):
        payload = {
            "data": [
                {
                    "id": "1",
                    "caption": "<script>alert(1)</script>",
                    "media_type": "IMAGE",
                    "media_url": "https://scontent.cdninstagram.com/photo.jpg",
                    "permalink": "https://www.instagram.com/p/ABC123/",
                    "timestamp": "2026-11-02T10:00:00+0000",
                },
                {
                    "id": "2",
                    "media_type": "VIDEO",
                    "media_url": "https://scontent.cdninstagram.com/video.mp4",
                    "permalink": "https://www.instagram.com/reel/DEF456/",
                    "timestamp": "2026-11-02T09:00:00+0000",
                },
                {
                    "id": "3",
                    "media_type": "IMAGE",
                    "media_url": "https://attacker.example/image.jpg",
                    "permalink": "https://www.instagram.com/p/GHI789/",
                    "timestamp": "2026-11-02T08:00:00+0000",
                },
            ]
        }

        posts = parse_instagram_media(payload)

        self.assertEqual(len(posts), 1)
        self.assertEqual(posts[0]["id"], "1")
        self.assertEqual(posts[0]["caption"], "<script>alert(1)</script>")

    def test_fetch_uses_authorization_header_not_query_token(self):
        payload = {
            "data": [
                {
                    "id": "1",
                    "media_type": "IMAGE",
                    "media_url": "https://scontent.cdninstagram.com/photo.jpg",
                    "permalink": "https://www.instagram.com/p/ABC123/",
                    "timestamp": "2026-11-02T10:00:00+0000",
                }
            ]
        }
        captured = {}

        def fake_urlopen(request, timeout):
            captured["url"] = request.full_url
            captured["authorization"] = request.get_header("Authorization")
            captured["timeout"] = timeout
            return FakeResponse(payload)

        with patch("update_instagram.urllib.request.urlopen", fake_urlopen):
            posts = fetch_instagram_media("12345", "private-token", "v23.0")

        self.assertEqual(len(posts), 1)
        self.assertNotIn("private-token", captured["url"])
        self.assertEqual(captured["authorization"], "Bearer private-token")
        self.assertEqual(captured["timeout"], 20)

    def test_feed_writer_only_changes_file_when_content_changes(self):
        from tempfile import TemporaryDirectory
        from pathlib import Path

        with TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "feed.json"
            feed = {"username": "ajavp.javip", "updated_at": None, "posts": []}

            self.assertTrue(write_json_if_changed(path, feed))
            self.assertFalse(write_json_if_changed(path, feed))


if __name__ == "__main__":
    unittest.main()
