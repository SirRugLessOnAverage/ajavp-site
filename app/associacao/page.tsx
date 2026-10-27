import type { Metadata } from "next";
import {
  Shield,
  Scale,
  Users,
  Vote,
  FileCheck,
  FileText,
  ExternalLink,
  Award,
  UserCheck,
  Crown,
  Info,
  CheckCircle2,
  Lock,
  ClipboardList,
  Calendar,
  Clock,
  ArrowRight,
  Globe,
  Camera,
  CalendarCheck,
  Landmark,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "A Associação • História, Órgãos Sociais & Pavilhões",
  description:
    "Conhece a história da AJAVP, fundada formalmente em dezembro de 2025. Órgãos sociais eleitos, estatutos, regime de votação e localização dos nossos pavilhões desportivos.",
};

export default function AssociacaoPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/80 dark:border-emerald-500/30">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Identidade, Valores &amp; Instalações</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-navy dark:text-white tracking-tight leading-tight">
              Quem Somos &bull; AJAVP
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Fundada formalmente em Dezembro de 2025 por associados e dirigentes que integraram a antiga JAVIP, a Associação Jovens e Adultos de Vilar do Pinheiro tem como missão primordial revitalizar a atividade desportiva, o civismo e a união comunitária na nossa terra.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre a Associação & Órgãos Sociais */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
                  A Nossa História &amp; Identidade
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy dark:text-white">
                  Uma Associação Jovem com Raízes Profundas
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                A <strong>AJAVP</strong> é uma associação jovem, formal e legalmente constituída a <strong>22 de Dezembro de 2025</strong> (Estatutos outorgados e registados), tendo os seus primeiros órgãos sociais tomado posse a <strong>26 de Dezembro de 2025</strong> (Ata N.º 1).
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                O clube nasce do compromisso e dedicação de um grupo de jovens e adultos de Vilar do Pinheiro, impulsionado por pessoas que fizeram parte ativa da <strong>antiga e emblemática JAVIP</strong>. Trazendo a experiência acumulada, o respeito pelas tradições e a inconfundível mística da <strong>Mancha Verde</strong>, refundámos o movimento desportivo sob uma estrutura associativa transparente, moderna e pronta para servir as próximas gerações.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-white/10 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-white/5">
                  <div className="font-heading font-black text-xl text-brand-navy dark:text-white">Dez 2025</div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Fundação Formal</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-white/5">
                  <div className="font-heading font-black text-xl text-brand-green dark:text-emerald-400">Legado</div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Membros da Antiga JAVIP</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-white/5">
                  <div className="font-heading font-black text-xl text-amber-600 dark:text-amber-400">1 € / mês</div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Quota (Menores Isentos)</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-white/5">
                  <div className="font-heading font-black text-xl text-teal-600 dark:text-teal-400">3 Anos</div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Mandato (2026–2028)</div>
                </div>
              </div>
            </div>

            {/* Ficha de Dados Oficiais */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white space-y-6 shadow-xl border-2 border-emerald-500/30 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">Dados Oficiais &amp; Constituição</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Associação sem fins lucrativos &bull; Ata N.º 1 e Estatutos</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">Nome Oficial:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">AJAVP – Associação Jovens e Adultos de Vilar do Pinheiro</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">NIPC / Pessoa Coletiva:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">519 096 045</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">NISS (Segurança Social):</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">25190960451</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">Data dos Estatutos:</span>
                  <span className="font-bold text-slate-900 dark:text-white">22 de Dezembro de 2025</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">Eleição e Tomada de Posse:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">26 de Dezembro de 2025 (Ata N.º 1)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">Sede Social Oficial:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">Rua 103, nº 43, Urbanização de Real, 4485-823 Vilar do Pinheiro</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400">Filiação Desportiva:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">ADCCVC / Jogos Inter-Freguesias</span>
                </div>
              </div>
              <a
                href="https://drive.google.com/file/d/1F0DrwMzSioop_dyUVbqdEgmP7I0g24qL/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/20 text-brand-navy dark:text-white py-3 rounded-xl font-bold text-xs transition-colors border border-slate-200 dark:border-white/15 shadow-xs"
              >
                <FileText className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                <span>Consultar Estatutos Oficiais (PDF)</span>
              </a>
            </div>
          </div>

          {/* Órgãos Sociais Oficiais */}
          <div className="pt-12 border-t border-slate-100 dark:border-white/10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/60">
                <Users className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
                <span>Triénio 2026–2028 &bull; Ata N.º 1</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
                Órgãos Sociais da AJAVP
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Eleitos por unanimidade dos associados fundadores na Assembleia Geral Ordinária de <strong>26 de Dezembro de 2025</strong> para um mandato estatutário de 3 anos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mesa da Assembleia Geral */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 space-y-4 hover:border-blue-300 dark:hover:border-blue-400/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-brand-navy dark:text-white">Mesa da Assembleia</h4>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">3 Membros &bull; Convocatórias</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs">
                    <li className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase block tracking-wider">Presidente</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Francisco José Moreira de Azevedo</span>
                    </li>
                    <li className="p-2.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-100 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-wider">Secretária</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Eva Cristina Vieira Alves</span>
                    </li>
                    <li className="p-2.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-100 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-wider">Secretária</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Sónia Patrícia Santos Nogueira</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-white/10">
                  Presidência das sessões e lavratura das atas da Assembleia Geral.
                </div>
              </div>

              {/* Direção */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/40 dark:to-slate-800 border-2 border-emerald-400 dark:border-emerald-500/70 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-emerald-200/80 dark:border-emerald-800/40">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-brand-navy dark:text-white">Direção do Clube</h4>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase">5 Membros &bull; Gerência</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs">
                    <li className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border-2 border-emerald-300 dark:border-emerald-500/60 shadow-2xs">
                      <span className="text-[10px] font-bold text-brand-green dark:text-emerald-400 uppercase block tracking-wider">Presidente da Direção</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Pedro Miguel da Silva Cruz</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900/70 border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-emerald-400/80 uppercase block tracking-wider">Vice-Presidente</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Ana Carina Lopes Pereira</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900/70 border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-emerald-400/80 uppercase block tracking-wider">Vice-Presidente</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Miguel Ângelo Gomes da Silveira</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900/70 border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-emerald-400/80 uppercase block tracking-wider">Secretária</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Beatriz Pinto Ribeiro</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900/70 border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-emerald-400/80 uppercase block tracking-wider">Tesoureiro</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Maurício António Ferreira Xavier</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 pt-3 border-t border-emerald-200 dark:border-emerald-800/40 font-medium">
                  A associação obriga-se com a intervenção do Presidente ou do Tesoureiro.
                </div>
              </div>

              {/* Conselho Fiscal */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 space-y-4 hover:border-amber-300 dark:hover:border-amber-400/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-brand-navy dark:text-white">Conselho Fiscal</h4>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">3 Membros &bull; Fiscalização</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs">
                    <li className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase block tracking-wider">Presidente</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Pedro de Oliveira Moreira</span>
                    </li>
                    <li className="p-2.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-100 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-wider">Vogal</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Paulo Sérgio Lopes de Azevedo</span>
                    </li>
                    <li className="p-2.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-100 dark:border-white/10 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block tracking-wider">Vogal</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Susana Isabel Vidal Duarte</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-white/10">
                  Fiscalização de atos administrativos e emissão de parecer sobre as contas do clube.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funcionam as Eleições & Regime de Votação */}
      <section id="eleicoes" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/70 dark:border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Vote className="w-4 h-4" />
                <span>Democracia Associativa &bull; Estatutos AJAVP</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy dark:text-white">
                Como Funcionam as Eleições &amp; Regime de Votação
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                A direção e a fiscalização da Associação assentam na participação democrática de todos os sócios, nos termos dos Estatutos e do Artigo 6.º do <strong>Regulamento Interno</strong>, que consagra o <strong>Regime de Votação Diferenciado</strong> por antiguidade.
              </p>
            </div>
            <div className="shrink-0 flex items-center flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1ZNM66sC4utRexz40rBJzbF7MJm6CtXFf/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <FileCheck className="w-4 h-4 text-white" />
                <span>Regulamento Interno (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
              <a
                href="https://drive.google.com/file/d/1F0DrwMzSioop_dyUVbqdEgmP7I0g24qL/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-brand-green hover:text-brand-green transition-all shadow-2xs"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Estatutos (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Tabela Oficial: Regime de Votação Diferenciado */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-400/80 dark:border-emerald-500/60 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Artigo 6.º &bull; Regulamento Interno AJAVP
                </span>
                <h3 className="font-heading font-black text-2xl text-brand-navy dark:text-white">
                  Tabela de Votos: Regime de Votação Diferenciado
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  O número de votos de cada associado é atribuído em função da categoria e dos anos completos de antiguidade:
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Valorização da Fidelidade Associativa</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sócios Efetivos */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800/80 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      <UserCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">Sócios Efetivos</h4>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase">Art. 6.º, n.º 1, al. b)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">1 a 5 Votos</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Têm direito a <strong>1 voto base</strong>, acrescido de <strong>1 voto adicional por cada 5 anos completos</strong>, até ao limite máximo de <strong>5 votos</strong>:
                </p>

                <div className="space-y-2 pt-1 text-xs font-medium">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">Menos de 5 anos de associado (Base)</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">1 Voto</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">De 5 a 9 anos completos (+1 voto)</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">2 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">De 10 a 14 anos completos (+2 votos)</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">3 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">De 15 a 19 anos completos (+3 votos)</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">4 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                    <span className="font-bold text-emerald-950 dark:text-emerald-200">20 ou mais anos completos (Teto Máximo Efetivo)</span>
                    <span className="font-black text-white bg-emerald-600 px-2.5 py-0.5 rounded-lg shadow-xs">5 Votos</span>
                  </div>
                </div>
              </div>

              {/* Sócios Fundadores */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/50 dark:from-slate-800/80 dark:to-amber-950/20 border border-amber-300/80 dark:border-amber-800/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
                      <Crown className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">Sócios Fundadores</h4>
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase">Art. 6.º, n.º 1, al. a) e c)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 text-xs font-extrabold">3 a 7 Votos</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Têm direito a <strong>3 votos base de honra</strong>, aplicando-se cumulativamente o acréscimo por antiguidade até ao teto de <strong>7 votos</strong>:
                </p>

                <div className="space-y-2 pt-1 text-xs font-medium">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">Base Estatutária de Fundador</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200/60">3 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">Com 5 anos completos de antiguidade</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200/60">4 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">Com 10 anos completos de antiguidade</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200/60">5 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300">Com 15 anos completos de antiguidade</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200/60">6 Votos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 shadow-2xs">
                    <span className="font-bold text-amber-950 dark:text-amber-200">Com 20 ou mais anos (Teto Soberano Máximo)</span>
                    <span className="font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-lg shadow-xs">7 Votos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Regra de Contagem:</strong> A antiguidade é calculada estritamente com base na data de admissão aprovada pela Direção (Art. 6.º, n.º 2).</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Regulamento Interno &bull; Artigo 6.º</span>
            </div>
          </div>

          {/* 4 Pilares do Regime Eleitoral */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-brand-green dark:text-emerald-300 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Eleitores</span>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">Quem Tem Direito a Voto?</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Têm capacidade eleitoral ativa todos os <strong className="text-slate-900 dark:text-white">associados maiores de idade</strong> no pleno gozo dos seus direitos estatutários e com a sua <strong className="text-slate-900 dark:text-white">quota associativa em dia</strong>.
                </p>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Caderno eleitoral conferido à entrada</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                  <Vote className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Exercício do Voto</span>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">Voto Secreto &amp; Diferenciado</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  O voto é <strong className="text-slate-900 dark:text-white">pessoal e secreto</strong> em urna durante a Assembleia Geral Eleitoral. O peso do voto segue a tabela de antiguidade.
                </p>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Votação presencial em boletim oficial</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">Candidaturas</span>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">Listas Completas (11 Elementos)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  As candidaturas são formalizadas em lista fechada para todos os Órgãos Sociais: Mesa da AG (3), Direção (5) e Conselho Fiscal (3).
                </p>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Maioria simples dos votos expressos</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">Periodicidade</span>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">Mandato de 3 Anos</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Nos termos estatutários, os mandatos têm duração de 3 anos civis. Os atuais Órgãos foram investidos para o triénio 2026–2028.
                </p>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Próximas eleições ordinárias em 2028</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Nossas Instalações & Recintos */}
      <section id="locais" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/60 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
              Instalações Desportivas
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy dark:text-white">
              Onde Treinamos e Jogamos
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Conhece a localização exata de cada um dos recintos com mapas e rotas GPS diretas para o telemóvel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pavilhão Canidelo */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 uppercase">
                    Pavilhão Coberto &bull; 4.ªs Feiras
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Pavilhão Municipal de Canidelo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Canidelo, Vila do Conde</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Treinos conjuntos de Futsal Sub-11 e Sub-13 (18h30–20h00) todas as quartas-feiras.</p>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  title="Mapa Pavilhão Desportivo Municipal de Canidelo"
                  src="https://maps.google.com/maps?q=41.3097411,-8.6434142&z=16&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Pavilh%C3%A3o+Desportivo+Municipal+de+Canidelo+-+Vila+do+Conde/@41.3097411,-8.6434142,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline flex items-center justify-between pt-1"
              >
                <span>Traçar Rota no Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pavilhão MaiaSport */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 uppercase">
                    Pavilhão Coberto &bull; 5.ªs Feiras
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Pavilhão MaiaSport (Pedras Rubras)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pedras Rubras, Maia</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Treinos aos Sub-9 às quintas-feiras (19h00–20h00), com espaço partilhado para Sub-7 ou Sub-13.</p>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  title="Mapa Pavilhão MaiaSport"
                  src="https://maps.google.com/maps?q=41.2483775,-8.6588456&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Maia+Sport/@41.2484458,-8.659225,139m"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline flex items-center justify-between pt-1"
              >
                <span>Traçar Rota no Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Ringue de Vilar do Pinheiro */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 uppercase">
                    Ringue Polidesportivo
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Ringue de Vilar do Pinheiro
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Vilar do Pinheiro, Vila do Conde</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Recinto ao ar livre de treinos regulares de 2.ª a 6.ª (19h00) e sábados de manhã.</p>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  title="Mapa Ringue AJAVP"
                  src="https://maps.google.com/maps?q=41.2722915,-8.6633585&z=18&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Ringue+%2F+Relvado+Sint%C3%A9tico/@41.2723525,-8.6634737,57m"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline flex items-center justify-between pt-1"
              >
                <span>Traçar Rota no Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Sede Social */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 uppercase">
                    Sede &bull; Secretaria
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Sede Social da AJAVP
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Rua 103, nº 43, Urbanização de Real</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Sede oficial da associação e reuniões estatutárias. Atendimento presencial mediante marcação.</p>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  title="Mapa Sede AJAVP"
                  src="https://maps.google.com/maps?q=41.265929,-8.673955&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <a
                href="https://maps.google.com/?q=41.265929,-8.673955"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline flex items-center justify-between pt-1"
              >
                <span>Traçar Rota no Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Junta de Freguesia */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4 md:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 uppercase">
                    Salão Nobre &bull; Ténis de Mesa &amp; Atletismo
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                  Junta de Freguesia de Vilar do Pinheiro
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Rua da Igreja, Vilar do Pinheiro</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Local oficial dos treinos de Ténis de Mesa aos sábados e ponto de encontro dominical do Atletismo.</p>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  title="Mapa Junta de Freguesia"
                  src="https://maps.google.com/maps?q=Junta+de+Freguesia+de+Vilar+do+Pinheiro&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="pt-1 flex items-center justify-between flex-wrap gap-2 text-xs font-bold">
                <a
                  href="https://vilardopinheiro.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>vilardopinheiro.pt</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href="https://maps.google.com/?q=Junta+de+Freguesia+de+Vilar+do+Pinheiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Balcão Documental da AJAVP */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
              Transparência &amp; Atendimento
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy dark:text-white">
              Balcão Documental da AJAVP
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Consulta os regulamentos internos, autorizações de treino experimental e o caderno oficial de patrocínios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Estatutos & Constituição",
                desc: "Documento legal de fundação da associação e constituição dos órgãos sociais.",
                icon: FileCheck,
                color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
                link: "https://drive.google.com/file/d/1F0DrwMzSioop_dyUVbqdEgmP7I0g24qL/view?usp=drive_link",
              },
              {
                title: "Regulamento Interno",
                desc: "Normas disciplinares, direitos e deveres dos atletas, encarregados e equipas técnicas.",
                icon: Scale,
                color: "bg-emerald-100 text-brand-green dark:bg-emerald-900/50 dark:text-emerald-300",
                link: "https://drive.google.com/file/d/1ZNM66sC4utRexz40rBJzbF7MJm6CtXFf/view?usp=drive_link",
              },
              {
                title: "Manual de Assiduidade",
                desc: "Regras de assiduidade aos treinos para convocatórias aos jogos oficiais JIF.",
                icon: CalendarCheck,
                color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
                link: "https://drive.google.com/file/d/1B3VBHHsfP3yC0T0u9-nv15TFklk6T6RI/view?usp=drive_link",
              },
              {
                title: "Treino Experimental",
                desc: "Autorização prévia obrigatória dos pais para a primeira sessão de treino de menores.",
                icon: UserCheck,
                color: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
                link: "https://drive.google.com/file/d/18FvwM6ge-8DQrFbSaeHmLjOtq2AbDPOD/view?usp=drive_link",
              },
              {
                title: "Recolha de Imagem",
                desc: "Autorização para registo fotográfico institucional, Jogos Inter-Freguesias e redes sociais.",
                icon: Camera,
                color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
                link: "https://drive.google.com/file/d/1H_pJp6fOknpFQXDx_ZLuxGAFOu1MA_qc/view?usp=drive_link",
              },
              {
                title: "Caderno de Patrocínios 26/27",
                desc: "Dossiê oficial para empresas com pacotes de visibilidade em equipamentos e recintos.",
                icon: Award,
                color: "bg-amber-500 text-slate-950",
                link: "https://drive.google.com/file/d/17d_U3W1jgAcoWb3--tZWHUZDmdBLvivS/view?usp=sharing",
              },
            ].map((doc, idx) => {
              const IconComp = doc.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-xl ${doc.color} flex items-center justify-center`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {doc.desc}
                    </p>
                  </div>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-white/10"
                  >
                    <span>Abrir no Google Drive (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
