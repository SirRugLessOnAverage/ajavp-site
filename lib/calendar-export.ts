/**
 * Utilitário universal para exportação de eventos desportivos para a agenda do utilizador
 * Compatível com Google Calendar e download de ficheiro .ics padrão (Apple Calendar, Outlook, telemóveis).
 */

export interface CalendarEventData {
  title: string;
  description: string;
  location: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // ex: "09:00", "09h00", "14:30"
  durationMinutes?: number;
}

export function parseEventTime(dateStr: string, timeStr: string, durationMinutes = 75) {
  const [ano, mes, dia] = dateStr.split("-").map(Number);
  let hora = 9;
  let minuto = 0;

  const matchHora = timeStr.match(/(\d{1,2})[:h](\d{2})?/i);
  if (matchHora) {
    hora = parseInt(matchHora[1], 10);
    if (matchHora[2]) minuto = parseInt(matchHora[2], 10);
  }

  // Obter timestamps em UTC para o formato iCalendar: YYYYMMDDTHHMMSSZ
  const startDate = new Date(Date.UTC(ano, mes - 1, dia, hora, minuto, 0));
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const formatUtcIso = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return {
    startUtcIso: formatUtcIso(startDate),
    endUtcIso: formatUtcIso(endDate),
    formattedDate: `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${ano}`,
    formattedTime: `${hora.toString().padStart(2, "0")}h${minuto.toString().padStart(2, "0")}`,
  };
}

export function getGoogleCalendarUrl(event: CalendarEventData): string {
  const { startUtcIso, endUtcIso } = parseEventTime(
    event.dateStr,
    event.timeStr,
    event.durationMinutes
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${startUtcIso}/${endUtcIso}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.location)}`;
}

export function downloadIcsFile(event: CalendarEventData, filenamePrefix = "ajavp-jogo"): void {
  if (typeof window === "undefined") return;

  const { startUtcIso, endUtcIso } = parseEventTime(
    event.dateStr,
    event.timeStr,
    event.durationMinutes
  );

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AJAVP//XL JIF 2026-2027//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@ajavp.pt`,
    `DTSTAMP:${startUtcIso}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    `DTSTART:${startUtcIso}`,
    `DTEND:${endUtcIso}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${filenamePrefix}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
