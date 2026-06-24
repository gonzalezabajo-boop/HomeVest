import { useState, useEffect } from "react";

const BURGUNDY = "#1B2A4A";
const BURGUNDY_LIGHT = "#2E4A7A";
const BLUE_LIGHT = "#3A7D44";
const CREAM = "#F5F7FA";
const GREY = "#6B7280";
const GREEN = "#3A7D44";

// ─── HOUSE SVG ───────────────────────────────────────────────
function HouseSVG({ progress }) {
  const p = Math.min(100, Math.max(0, progress));
  const hasFoundation = p >= 5;
  const hasWalls = p >= 20;
  const hasRoof = p >= 40;
  const hasWindows = p >= 55;
  const hasDoor = p >= 65;
  const hasGarden = p >= 80;
  const hasChimney = p >= 90;
  const isComplete = p >= 100;
  const wallOpacity = hasWalls ? Math.min(1, (p - 20) / 20) : 0;
  const roofOpacity = hasRoof ? Math.min(1, (p - 40) / 15) : 0;

  return (
    <svg
      viewBox="0 0 200 180"
      className="w-full h-full"
      style={{
        filter: isComplete ? "drop-shadow(0 0 12px #A8D8EA66)" : "none",
        transition: "filter 0.8s",
      }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={isComplete ? "#1a3a5c" : "#e8d5c4"}
            style={{ transition: "stop-color 1s" }}
          />
          <stop
            offset="100%"
            stopColor={isComplete ? "#2E75B6" : "#f5e6d3"}
            style={{ transition: "stop-color 1s" }}
          />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5f0eb" />
          <stop offset="100%" stopColor="#e8ddd4" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={BURGUNDY_LIGHT} />
          <stop offset="100%" stopColor={BURGUNDY} />
        </linearGradient>
      </defs>
      <rect
        width="200"
        height="180"
        fill="url(#skyGrad)"
        rx="12"
        style={{ transition: "all 1s" }}
      />
      {isComplete &&
        [
          [20, 20],
          [50, 15],
          [160, 18],
          [175, 35],
          [30, 45],
          [145, 10],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.8" />
        ))}
      {isComplete && (
        <circle cx="170" cy="25" r="10" fill="#FFF9C4" opacity="0.9" />
      )}
      {!isComplete && p > 10 && (
        <circle
          cx="165"
          cy="28"
          r="12"
          fill="#F4B942"
          opacity={0.6 + p / 250}
        />
      )}
      <rect
        x="0"
        y="148"
        width="200"
        height="32"
        fill={isComplete ? "#1a4a2e" : "#8B6F47"}
        style={{ transition: "fill 1s" }}
      />
      {hasGarden && (
        <>
          <ellipse
            cx="100"
            cy="148"
            rx="90"
            ry="6"
            fill={isComplete ? "#2d6a4f" : "#5a8a3c"}
            opacity={Math.min(1, (p - 80) / 20)}
            style={{ transition: "opacity 0.5s" }}
          />
          {p >= 85 &&
            [30, 55, 145, 168].map((x, i) => (
              <g key={i} opacity={Math.min(1, (p - 85) / 15)}>
                <line
                  x1={x}
                  y1="148"
                  x2={x}
                  y2="140"
                  stroke="#5a8a3c"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy="139"
                  r="3"
                  fill={["#FF6B9D", "#FF8C42", BLUE_LIGHT, "#F4B942"][i]}
                />
              </g>
            ))}
        </>
      )}
      {hasFoundation && (
        <rect
          x="48"
          y="142"
          width="104"
          height="8"
          fill="#8B7355"
          opacity={Math.min(1, (p - 5) / 10)}
          style={{ transition: "opacity 0.5s" }}
          rx="1"
        />
      )}
      {hasWalls && (
        <rect
          x="52"
          y="100"
          width="96"
          height="44"
          fill="url(#wallGrad)"
          opacity={wallOpacity}
          style={{ transition: "opacity 0.5s" }}
        />
      )}
      {hasChimney && (
        <rect
          x="140"
          y="75"
          width="12"
          height="22"
          fill="#7a6050"
          opacity={Math.min(1, (p - 90) / 10)}
        />
      )}
      {hasRoof && (
        <polygon
          points="100,62 155,102 45,102"
          fill="url(#roofGrad)"
          opacity={roofOpacity}
          style={{ transition: "opacity 0.5s" }}
        />
      )}
      {hasRoof && roofOpacity > 0.5 && (
        <line
          x1="45"
          y1="102"
          x2="155"
          y2="102"
          stroke={BURGUNDY}
          strokeWidth="2"
          opacity={roofOpacity}
        />
      )}
      {hasWindows && (
        <g
          opacity={Math.min(1, (p - 55) / 10)}
          style={{ transition: "opacity 0.5s" }}
        >
          <rect
            x="62"
            y="108"
            width="22"
            height="18"
            fill={isComplete ? "#FFF9C4" : BLUE_LIGHT}
            rx="2"
            opacity="0.9"
          />
          <line
            x1="73"
            y1="108"
            x2="73"
            y2="126"
            stroke="#aaa"
            strokeWidth="1"
          />
          <line
            x1="62"
            y1="117"
            x2="84"
            y2="117"
            stroke="#aaa"
            strokeWidth="1"
          />
          <rect
            x="116"
            y="108"
            width="22"
            height="18"
            fill={isComplete ? "#FFF9C4" : BLUE_LIGHT}
            rx="2"
            opacity="0.9"
          />
          <line
            x1="127"
            y1="108"
            x2="127"
            y2="126"
            stroke="#aaa"
            strokeWidth="1"
          />
          <line
            x1="116"
            y1="117"
            x2="138"
            y2="117"
            stroke="#aaa"
            strokeWidth="1"
          />
        </g>
      )}
      {hasDoor && (
        <g
          opacity={Math.min(1, (p - 65) / 15)}
          style={{ transition: "opacity 0.5s" }}
        >
          <rect x="88" y="118" width="24" height="26" fill={BURGUNDY} rx="2" />
          <circle cx="109" cy="131" r="2" fill="#F4B942" />
          <path
            d="M88,120 Q100,112 112,120"
            fill="none"
            stroke={BURGUNDY_LIGHT}
            strokeWidth="1.5"
          />
        </g>
      )}
      {isComplete &&
        [
          [40, 60],
          [160, 55],
          [25, 100],
          [175, 95],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              x1={x}
              y1={y - 6}
              x2={x}
              y2={y + 6}
              stroke={BLUE_LIGHT}
              strokeWidth="1.5"
              opacity="0.8"
            />
            <line
              x1={x - 6}
              y1={y}
              x2={x + 6}
              y2={y}
              stroke={BLUE_LIGHT}
              strokeWidth="1.5"
              opacity="0.8"
            />
          </g>
        ))}
    </svg>
  );
}

function getMilestoneLabel(progress) {
  if (progress < 5) return { text: "Empieza tu sueño", emoji: "💭" };
  if (progress < 20) return { text: "Cimientos puestos", emoji: "🏗️" };
  if (progress < 40) return { text: "Paredes levantadas", emoji: "🧱" };
  if (progress < 55) return { text: "¡Tejado colocado!", emoji: "🏠" };
  if (progress < 65) return { text: "Ventanas instaladas", emoji: "🪟" };
  if (progress < 80) return { text: "Puerta principal", emoji: "🚪" };
  if (progress < 90) return { text: "Jardín floreciendo", emoji: "🌸" };
  if (progress < 100) return { text: "¡Casi lista!", emoji: "🎉" };
  return { text: "¡Tu casa es tuya!", emoji: "🔑" };
}

function formatEuro(n) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── HOME SCORE ──────────────────────────────────────────────
function calcHomeScore({
  progress,
  monthlyInput,
  savedAmount,
  totalNeeded,
  age,
  hasEmergencyFund,
}) {
  let score = 0;
  // Ahorro acumulado (40 pts)
  score += Math.min(40, Math.round(progress * 0.4));
  // Ritmo mensual (20 pts) — >500€/mes = full
  score += Math.min(20, Math.round((monthlyInput / 500) * 20));
  // Edad (15 pts) — antes de 35 accede a aval ICO
  score += age <= 35 ? 15 : age <= 40 ? 8 : 3;
  // Fondo de emergencia (15 pts)
  score += hasEmergencyFund ? 15 : 0;
  // Plazo (10 pts) — si llega en <3 años
  const months =
    monthlyInput > 0
      ? Math.ceil(Math.max(0, totalNeeded - savedAmount) / monthlyInput)
      : 999;
  score += months <= 24 ? 10 : months <= 36 ? 6 : months <= 60 ? 3 : 0;
  return Math.min(100, score);
}

function ScoreRing({ score }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 75 ? GREEN : score >= 50 ? "#F4B942" : BURGUNDY;
  return (
    <div
      style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#E0E8F0"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: 9, color: GREY, fontWeight: 600 }}>
          HOME SCORE
        </span>
      </div>
    </div>
  );
}

// ─── AYUDAS PÚBLICAS ─────────────────────────────────────────
const AYUDAS_DB = {
  Madrid: [
    {
      name: "Aval ICO Primera Vivienda",
      desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años. Permite comprar sin el 20% de entrada.",
      tag: "Estatal",
      color: BURGUNDY,
    },
    {
      name: "Deducción IRPF Comunidad de Madrid",
      desc: "Deducción del 5% en la cuota íntegra autonómica por adquisición de primera vivienda habitual.",
      tag: "Autonómica",
      color: "#1565C0",
    },
    {
      name: "Plan Estatal de Vivienda",
      desc: "Ayudas directas para jóvenes en zonas tensionadas, hasta 10.800€ en función de ingresos.",
      tag: "Estatal",
      color: GREEN,
    },
  ],
  Barcelona: [
    {
      name: "Aval ICO Primera Vivienda",
      desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
      tag: "Estatal",
      color: BURGUNDY,
    },
    {
      name: "Ajuts al lloguer joves (Cataluña)",
      desc: "Subvención del 20% del alquiler para jóvenes hasta 35 años con ingresos limitados.",
      tag: "Autonómica",
      color: "#1565C0",
    },
    {
      name: "Pla de l'habitatge de Barcelona",
      desc: "Préstamos a tipo cero para la entrada de primera vivienda en Barcelona ciudad.",
      tag: "Local",
      color: GREEN,
    },
  ],
  Valencia: [
    {
      name: "Aval ICO Primera Vivienda",
      desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
      tag: "Estatal",
      color: BURGUNDY,
    },
    {
      name: "Ajudes Habitatge GVA",
      desc: "Subvenciones de la Generalitat Valenciana para adquisición de primera vivienda, hasta 11.000€.",
      tag: "Autonómica",
      color: "#1565C0",
    },
  ],
  Sevilla: [
    {
      name: "Aval ICO Primera Vivienda",
      desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
      tag: "Estatal",
      color: BURGUNDY,
    },
    {
      name: "Plan Vive Andalucía",
      desc: "Programa de vivienda protegida y ayudas a la compra para jóvenes andaluces.",
      tag: "Autonómica",
      color: "#1565C0",
    },
  ],
  Bilbao: [
    {
      name: "Aval ICO Primera Vivienda",
      desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
      tag: "Estatal",
      color: BURGUNDY,
    },
    {
      name: "Etxebide — Vivienda País Vasco",
      desc: "Sistema público vasco de acceso a vivienda protegida con precios por debajo de mercado.",
      tag: "Autonómica",
      color: "#1565C0",
    },
    {
      name: "Deducción IRPF Foral",
      desc: "Deducción del 18% en IRPF por adquisición de primera vivienda habitual en territorio foral.",
      tag: "Autonómica",
      color: GREEN,
    },
  ],
};

const CIUDADES = Object.keys(AYUDAS_DB);

// ─── COMPRAR vs ALQUILAR ─────────────────────────────────────
function calcComprarVsAlquilar({
  pisoPrice,
  monthlyRent,
  savedAmount,
  monthlyInput,
}) {
  const entrada = pisoPrice * 0.2;
  const gastos = pisoPrice * 0.1;
  const hipoteca = pisoPrice * 0.8;
  const tipoHipo = 0.035; // 3.5% TAE estimado
  const plazo = 30;
  const cuotaMensual =
    (hipoteca * (tipoHipo / 12) * Math.pow(1 + tipoHipo / 12, plazo * 12)) /
    (Math.pow(1 + tipoHipo / 12, plazo * 12) - 1);
  const revalorAnual = pisoPrice * 0.03; // 3% revalorización anual estimada
  const mesesHastaEntrada =
    monthlyInput > 0
      ? Math.ceil(Math.max(0, entrada + gastos - savedAmount) / monthlyInput)
      : 999;
  const totalAlquiler10 = monthlyRent * 120;
  const totalCompra10 = cuotaMensual * 120;
  const patrimonioCompra10 = revalorAnual * 10;

  return {
    cuotaMensual,
    mesesHastaEntrada,
    totalAlquiler10,
    totalCompra10,
    patrimonioCompra10,
  };
}

// ─── MAIN APP ────────────────────────────────────────────────
const TABS = [
  "Simulador",
  "Home Score",
  "Ayudas",
  "Comprar vs Alquilar",
  "Hipoteca",
];

export default function HomeVestApp() {
  const [activeTab, setActiveTab] = useState(0);

  // Shared state
  const [pisoPrice, setPisoPrice] = useState(200000);
  const [savedAmount, setSavedAmount] = useState(0);
  const [monthlyInput, setMonthlyInput] = useState(500);
  const [age, setAge] = useState(28);
  const [ciudad, setCiudad] = useState("Madrid");
  const [monthlyRent, setMonthlyRent] = useState(900);
  const [hasEmergency, setHasEmergency] = useState(false);
  const [animProg, setAnimProg] = useState(0);
  const [alertSet, setAlertSet] = useState(false);
  const [showAvalICO, setShowAvalICO] = useState(false);
  // Onboarding
  const [onboarded, setOnboarded] = useState(false);
  const [userName, setUserName] = useState("");
  // Hipoteca
  const [tipoHipo, setTipoHipo] = useState("fijo");
  const [plazo, setPlazo] = useState(30);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // Idealista filters
  const [habitaciones, setHabitaciones] = useState(0);
  const [tipoVivienda, setTipoVivienda] = useState("todos");
  const [barrio, setBarrio] = useState("");
  // Perfil ayudas
  const [ingresos, setIngresos] = useState(30000);
  const [primeraViv, setPrimeraViv] = useState(true);

  const entradaNecesaria = pisoPrice * 0.2;
  const gastos = pisoPrice * 0.1;
  const totalNeeded = entradaNecesaria + gastos;
  const progress = Math.min(100, (savedAmount / totalNeeded) * 100);
  const remaining = Math.max(0, totalNeeded - savedAmount);
  const monthsLeft =
    monthlyInput > 0 ? Math.ceil(remaining / monthlyInput) : null;
  const yearsLeft = monthsLeft ? (monthsLeft / 12).toFixed(1) : null;
  const milestone = getMilestoneLabel(animProg);

  const homeScore = calcHomeScore({
    progress,
    monthlyInput,
    savedAmount,
    totalNeeded,
    age,
    hasEmergencyFund: hasEmergency,
  });
  const cvA = calcComprarVsAlquilar({
    pisoPrice,
    monthlyRent,
    savedAmount,
    monthlyInput,
  });

  // Barrios por ciudad
  const BARRIOS_DB = {
    Madrid: [
      "Todos los barrios",
      "Salamanca",
      "Chamberí",
      "Malasaña",
      "Lavapiés",
      "Retiro",
      "Chamartín",
      "Moncloa",
      "Carabanchel",
      "Vallecas",
      "Hortaleza",
      "Tetuán",
      "Arganzuela",
      "Vicálvaro",
      "Moratalaz",
    ],
    Barcelona: [
      "Todos los barrios",
      "Eixample",
      "Gràcia",
      "Sarrià-Sant Gervasi",
      "Poble Sec",
      "Sant Martí",
      "Poblenou",
      "Horta",
      "Les Corts",
      "Sant Andreu",
      "Nou Barris",
      "Sants",
      "Barceloneta",
      "El Born",
      "Esquerra de l'Eixample",
    ],
    Valencia: [
      "Todos los barrios",
      "Ciutat Vella",
      "Eixample",
      "Extramurs",
      "Campanar",
      "La Saïdia",
      "El Pla del Real",
      "L'Olivereta",
      "Patraix",
      "Jesús",
      "Quatre Carreres",
      "Poblats Marítims",
      "Camins al Grau",
      "Algirós",
      "Benimaclet",
    ],
    Sevilla: [
      "Todos los barrios",
      "Triana",
      "Santa Cruz",
      "El Arenal",
      "Nervión",
      "Los Remedios",
      "Macarena",
      "Bellavista",
      "San Pablo",
      "Palmete",
      "Cerro-Amate",
      "Torreblanca",
      "La Candelaria",
      "Heliópolis",
      "Buhayra",
    ],
    Bilbao: [
      "Todos los barrios",
      "Abando",
      "Indautxu",
      "Begoña",
      "Deusto",
      "Basurto",
      "Santutxu",
      "Rekalde",
      "Uribarri",
      "Otxarkoaga",
      "Txurdinaga",
      "Ibaiondo",
      "Zorrotza",
      "Zorroza",
      "Irala",
    ],
  };

  const BARRIO_SLUGS = {
    Madrid: {
      Salamanca: "salamanca",
      Chamberí: "chamberi",
      Malasaña: "malasana",
      Lavapiés: "lavapies",
      Retiro: "retiro",
      Chamartín: "chamartin",
      Moncloa: "moncloa",
      Carabanchel: "carabanchel",
      Vallecas: "vallecas",
      Hortaleza: "hortaleza",
      Tetuán: "tetuan",
      Arganzuela: "arganzuela",
      Vicálvaro: "vicalvaro",
      Moratalaz: "moratalaz",
    },
    Barcelona: {
      Eixample: "eixample",
      Gràcia: "gracia",
      "Sarrià-Sant Gervasi": "sarria-sant-gervasi",
      "Poble Sec": "poble-sec",
      "Sant Martí": "sant-marti",
      Poblenou: "poblenou",
      Horta: "horta",
      "Les Corts": "les-corts",
      "Sant Andreu": "sant-andreu",
      "Nou Barris": "nou-barris",
      Sants: "sants",
      Barceloneta: "barceloneta",
      "El Born": "el-born",
      "Esquerra de l'Eixample": "esquerra-de-l-eixample",
    },
    Valencia: {
      "Ciutat Vella": "ciutat-vella",
      Eixample: "eixample",
      Extramurs: "extramurs",
      Campanar: "campanar",
      "La Saïdia": "la-saidia",
      "El Pla del Real": "el-pla-del-real",
      "L'Olivereta": "l-olivereta",
      Patraix: "patraix",
      Jesús: "jesus",
      "Quatre Carreres": "quatre-carreres",
      "Poblats Marítims": "poblats-maritims",
      "Camins al Grau": "camins-al-grau",
      Algirós: "algiros",
      Benimaclet: "benimaclet",
    },
    Sevilla: {
      Triana: "triana",
      "Santa Cruz": "santa-cruz",
      "El Arenal": "el-arenal",
      Nervión: "nervion",
      "Los Remedios": "los-remedios",
      Macarena: "macarena",
      Bellavista: "bellavista",
      "San Pablo": "san-pablo",
      Palmete: "palmete",
      "Cerro-Amate": "cerro-amate",
      Torreblanca: "torreblanca",
      "La Candelaria": "la-candelaria",
      Heliópolis: "heliopolis",
      Buhayra: "buhayra",
    },
    Bilbao: {
      Abando: "abando",
      Indautxu: "indautxu",
      Begoña: "begona",
      Deusto: "deusto",
      Basurto: "basurto",
      Santutxu: "santutxu",
      Rekalde: "rekalde",
      Uribarri: "uribarri",
      Otxarkoaga: "otxarkoaga",
      Txurdinaga: "txurdinaga",
      Ibaiondo: "ibaiondo",
      Zorrotza: "zorrotza",
      Zorroza: "zorroza",
      Irala: "irala",
    },
  };

  // Idealista URL con filtros correctos — formato path nativo de Idealista
  const CIUDAD_SLUGS = {
    Madrid: "madrid-madrid",
    Barcelona: "barcelona-barcelona",
    Valencia: "valencia-valencia",
    Sevilla: "sevilla-sevilla",
    Bilbao: "bilbao-vizcaya",
  };

  const idealistaUrl = () => {
    const maxPrice = Math.round(pisoPrice * 1.05);
    const ciudadSlug = CIUDAD_SLUGS[ciudad] || "madrid-madrid";
    const barrioSlug =
      barrio && barrio !== "Todos los barrios"
        ? BARRIO_SLUGS[ciudad]?.[barrio] || ""
        : "";

    let base = barrioSlug
      ? `https://www.idealista.com/venta-viviendas/${ciudadSlug}/${barrioSlug}-${
          ciudadSlug.split("-")[0]
        }/`
      : `https://www.idealista.com/venta-viviendas/${ciudadSlug}/`;

    let filtros = [`con-precio-hasta_${maxPrice}`];
    if (habitaciones > 0) filtros.push(`de-${habitaciones}-habitaciones`);
    if (tipoVivienda === "atico") filtros.push("tipologia-aticos");
    if (tipoVivienda === "estudio") filtros.push("tipologia-estudios");
    if (tipoVivienda === "casa") filtros.push("tipologia-chalets");

    return `${base}${filtros.join(",")}/`;
  };

  useEffect(() => {
    const target = progress;
    const diff = target - animProg;
    if (Math.abs(diff) < 0.1) {
      setAnimProg(target);
      return;
    }
    const t = setTimeout(() => setAnimProg((p) => p + diff / 20), 16);
    return () => clearTimeout(t);
  }, [progress, animProg]);

  const card = (children, extra = {}) => (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        padding: "20px",
        boxShadow: "0 4px 24px rgba(27,42,74,0.08)",
        ...extra,
      }}
    >
      {children}
    </div>
  );

  const sectionTitle = (t) => (
    <h3
      style={{
        margin: "0 0 14px",
        fontSize: 12,
        fontWeight: 700,
        color: BURGUNDY,
        textTransform: "uppercase",
        letterSpacing: "1.2px",
      }}
    >
      {t}
    </h3>
  );

  const numInput = (
    label,
    value,
    setValue,
    min,
    max,
    step,
    format,
    prefix = "",
    suffix = ""
  ) => (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          fontSize: 12,
          color: GREY,
          fontWeight: 600,
          display: "block",
          marginBottom: 8,
          letterSpacing: "0.3px",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1.5px solid #E0E8F0`,
          borderRadius: 12,
          overflow: "hidden",
          background: "white",
        }}
      >
        <button
          onClick={() => setValue(Math.max(min, value - step))}
          style={{
            width: 44,
            height: 44,
            border: "none",
            background: "#F5F7FA",
            color: BURGUNDY,
            fontSize: 20,
            fontWeight: 300,
            cursor: "pointer",
            flexShrink: 0,
            borderRight: "1px solid #E0E8F0",
          }}
        >
          −
        </button>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            padding: "0 6px",
          }}
        >
          {prefix && (
            <span style={{ fontSize: 13, color: GREY }}>{prefix}</span>
          )}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!isNaN(v)) setValue(Math.min(max, Math.max(min, v)));
            }}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              color: BURGUNDY,
              background: "transparent",
              MozAppearance: "textfield",
            }}
          />
          {suffix && (
            <span style={{ fontSize: 13, color: GREY, whiteSpace: "nowrap" }}>
              {suffix}
            </span>
          )}
        </div>
        <button
          onClick={() => setValue(Math.min(max, value + step))}
          style={{
            width: 44,
            height: 44,
            border: "none",
            background: "#F5F7FA",
            color: BURGUNDY,
            fontSize: 20,
            fontWeight: 300,
            cursor: "pointer",
            flexShrink: 0,
            borderLeft: "1px solid #E0E8F0",
          }}
        >
          +
        </button>
      </div>
    </div>
  );

  // ── TAB 0: SIMULADOR ────────────────────────────────────────
  const tabSimulador = (
    <>
      {card(
        <>
          <div
            style={{
              width: "100%",
              maxWidth: 260,
              margin: "0 auto 12px",
              height: 190,
            }}
          >
            <HouseSVG progress={animProg} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                background: progress >= 100 ? BURGUNDY : "#F0F4FF",
                border: `1.5px solid ${progress >= 100 ? BURGUNDY : "#C8D5E8"}`,
                borderRadius: 100,
                padding: "6px 18px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>{milestone.emoji}</span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: progress >= 100 ? "white" : BURGUNDY,
                }}
              >
                {milestone.text}
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#E0E8F0",
              borderRadius: 100,
              height: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 100,
                background: `linear-gradient(90deg,${BURGUNDY},${BLUE_LIGHT})`,
                width: `${animProg}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 11,
              color: GREY,
            }}
          >
            <span>{formatEuro(savedAmount)} ahorrados</span>
            <span style={{ fontWeight: 700, color: BURGUNDY }}>
              {animProg.toFixed(0)}%
            </span>
            <span>Meta: {formatEuro(totalNeeded)}</span>
          </div>
        </>
      )}

      {card(
        <>
          {sectionTitle("Tu situación")}
          {numInput(
            "Precio del piso",
            pisoPrice,
            setPisoPrice,
            80000,
            600000,
            5000,
            formatEuro
          )}
          {numInput(
            "Lo que ya tienes ahorrado",
            savedAmount,
            setSavedAmount,
            0,
            totalNeeded,
            500,
            formatEuro
          )}
          {numInput(
            "Ahorro mensual",
            monthlyInput,
            setMonthlyInput,
            100,
            2000,
            50,
            formatEuro,
            "",
            "/mes"
          )}
          {numInput("Tu edad", age, setAge, 18, 50, 1, (v) => v, "", " años")}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 12,
                color: GREY,
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Ciudad donde quieres comprar
            </label>
            <select
              value={ciudad}
              onChange={(e) => {
                setCiudad(e.target.value);
                setBarrio("");
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1.5px solid #C8D5E8`,
                fontSize: 13,
                color: BURGUNDY,
                fontWeight: 600,
                background: "#F0F4FF",
              }}
            >
              {CIUDADES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              background: "#F5F7FA",
              borderRadius: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: BURGUNDY }}>
                Tengo fondo de emergencia
              </div>
              <div style={{ fontSize: 11, color: GREY, marginTop: 2 }}>
                3 meses de gastos ahorrados aparte
              </div>
            </div>
            <button
              onClick={() => setHasEmergency(!hasEmergency)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: hasEmergency ? GREEN : "#d1d5db",
                transition: "background 0.3s",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 3,
                  left: hasEmergency ? 23 : 3,
                  transition: "left 0.3s",
                }}
              />
            </button>
          </div>
        </>
      )}

      {progress >= 100 ? (
        <div
          style={{
            background: `linear-gradient(135deg,${BURGUNDY},#2E4A7A)`,
            borderRadius: 20,
            padding: 20,
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔑</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
            ¡Lista para comprar!
          </div>
          <p style={{ fontSize: 12, opacity: 0.8, margin: "0 0 16px" }}>
            Ya tienes entrada y gastos cubiertos. Busca tu piso ahora.
          </p>
          <a
            href={idealistaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: BLUE_LIGHT,
              color: BURGUNDY,
              fontWeight: 800,
              fontSize: 13,
              padding: "10px 22px",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Ver pisos en {ciudad} →
          </a>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 20,
            border: "1.5px solid #E0E8F0",
            boxShadow: "0 4px 24px rgba(27,42,74,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BURGUNDY,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: 14,
            }}
          >
            Tu proyección
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            {[
              ["Entrada (20%)", formatEuro(entradaNecesaria), "#1B2A4A"],
              ["Gastos notaría/imp.", formatEuro(gastos), "#1B2A4A"],
              ["Te falta", formatEuro(remaining), "#3A7D44"],
              ["Llegas en", yearsLeft ? `${yearsLeft} años` : "—", "#3A7D44"],
            ].map(([label, val, color]) => (
              <div
                key={label}
                style={{
                  background: "#F5F7FA",
                  borderRadius: 12,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: GREY,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#EDF4EE",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 12,
              lineHeight: 1.5,
              borderLeft: `3px solid #3A7D44`,
              marginBottom: 14,
              color: "#1B2A4A",
            }}
          >
            💡 +100€/mes → llegas en{" "}
            <strong style={{ color: "#3A7D44" }}>
              {(
                Math.max(0, totalNeeded - savedAmount) /
                (monthlyInput + 100) /
                12
              ).toFixed(1)}{" "}
              años
            </strong>
          </div>

          {/* CTA Ayudas */}
          <button
            onClick={() => setActiveTab(2)}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#4A9B5F,#3D8A52)",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "13px 16px",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Puedes beneficiarte de ayudas — ver cuáles
          </button>

          {/* Filtros Idealista */}
          <div style={{ borderTop: "1px solid #E0E8F0", paddingTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: BURGUNDY,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 12,
              }}
            >
              Filtros para buscar tu piso
            </div>

            {/* Habitaciones */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  color: GREY,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Habitaciones
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  ["Todas", 0],
                  ["1+", 1],
                  ["2+", 2],
                  ["3+", 3],
                  ["4+", 4],
                ].map(([label, val]) => (
                  <button
                    key={val}
                    onClick={() => setHabitaciones(Number(val))}
                    style={{
                      flex: 1,
                      padding: "6px 0",
                      borderRadius: 8,
                      border: `1.5px solid ${
                        habitaciones === val ? BURGUNDY : "#E0E8F0"
                      }`,
                      background: habitaciones === val ? BURGUNDY : "white",
                      color: habitaciones === val ? "white" : GREY,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo vivienda */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  color: GREY,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Tipo de vivienda
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  ["Todos", "todos"],
                  ["Piso", "piso"],
                  ["Ático", "atico"],
                  ["Estudio", "estudio"],
                  ["Casa", "casa"],
                ].map(([label, val]) => (
                  <button
                    key={val}
                    onClick={() => setTipoVivienda(val)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1.5px solid ${
                        tipoVivienda === val ? BURGUNDY : "#E0E8F0"
                      }`,
                      background: tipoVivienda === val ? BURGUNDY : "white",
                      color: tipoVivienda === val ? "white" : GREY,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Barrio */}
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  color: GREY,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Barrio
              </div>
              <select
                value={barrio || "Todos los barrios"}
                onChange={(e) => setBarrio(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1.5px solid #E0E8F0`,
                  fontSize: 13,
                  color: "#1B2A4A",
                  fontWeight: 600,
                  background: "white",
                  cursor: "pointer",
                }}
              >
                {(BARRIOS_DB[ciudad] || []).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <a
              href={idealistaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: BURGUNDY,
                color: "white",
                fontWeight: 700,
                fontSize: 13,
                padding: "12px 16px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              🏡 Ver pisos hasta {formatEuro(pisoPrice)} en {ciudad}
            </a>
          </div>

          {/* Alerta */}
          <div style={{ marginTop: 12 }}>
            {alertSet ? (
              <div
                style={{
                  fontSize: 12,
                  color: "#3A7D44",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                ✅ Te avisaremos cuando estés al 80% de tu meta
              </div>
            ) : (
              <button
                onClick={() => setAlertSet(true)}
                style={{
                  background: "transparent",
                  border: `1.5px solid #E0E8F0`,
                  color: GREY,
                  fontSize: 12,
                  padding: "8px 16px",
                  borderRadius: 100,
                  cursor: "pointer",
                  width: "100%",
                  marginTop: 8,
                }}
              >
                🔔 Activar alerta cuando llegue al 80%
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );

  // ── TAB 1: HOME SCORE ───────────────────────────────────────
  const scoreExplanation = [
    {
      range: [0, 24],
      emoji: "🌱",
      label: "Empieza a ahorrar",
      color: "#C62828",
      bg: "#FFEBEE",
      desc: "Define tu objetivo y empieza con disciplina. Cada euro cuenta.",
    },
    {
      range: [25, 49],
      emoji: "🏗️",
      label: "Construyendo bases",
      color: "#E65100",
      bg: "#FFF3E0",
      desc: "Buen inicio. Mantén el ritmo y refuerza tu fondo de emergencia.",
    },
    {
      range: [50, 74],
      emoji: "📈",
      label: "Buen camino",
      color: "#F4B942",
      bg: "#FFFDE7",
      desc: "Vas bien. Infórmate sobre hipotecas y limpia tu perfil crediticio.",
    },
    {
      range: [75, 89],
      emoji: "🏠",
      label: "Casi listo",
      color: "#2E7D32",
      bg: "#E8F5E9",
      desc: "Muy cerca. Pide una pre-aprobación hipotecaria y busca piso en serio.",
    },
    {
      range: [90, 100],
      emoji: "🔑",
      label: "Listo para comprar",
      color: "#1B2A4A",
      bg: "#E3F2FD",
      desc: "Perfil excelente. Habla con HomeVest para conseguir la mejor hipoteca.",
    },
  ];
  const currentScore =
    scoreExplanation.find(
      (s) => homeScore >= s.range[0] && homeScore <= s.range[1]
    ) || scoreExplanation[0];
  const scoreColor =
    homeScore >= 75 ? GREEN : homeScore >= 50 ? "#F4B942" : BURGUNDY;
  const scoreLabel =
    homeScore >= 75
      ? "Listo para comprar"
      : homeScore >= 50
      ? "Buen camino"
      : "Empieza a ahorrar";
  const tabHomeScore = (
    <>
      {card(
        <>
          {sectionTitle("Tu Home Score")}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 16,
            }}
          >
            <ScoreRing score={homeScore} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: scoreColor }}>
                {scoreLabel}
              </div>
              <div style={{ fontSize: 12, color: GREY, marginTop: 4 }}>
                Puntuación de preparación para comprar
              </div>
            </div>
          </div>

          {/* Visual explanation card */}
          <div
            style={{
              background: currentScore.bg,
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 16,
              borderLeft: `3px solid ${currentScore.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 22 }}>{currentScore.emoji}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: currentScore.color,
                }}
              >
                {currentScore.label}
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: currentScore.color,
                margin: 0,
                lineHeight: 1.6,
                opacity: 0.85,
              }}
            >
              {currentScore.desc}
            </p>
          </div>

          {/* Score scale */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                color: GREY,
                fontWeight: 600,
                marginBottom: 8,
                letterSpacing: "0.5px",
              }}
            >
              ESCALA DE PUNTUACIÓN
            </div>
            <div
              style={{
                display: "flex",
                borderRadius: 8,
                overflow: "hidden",
                height: 8,
              }}
            >
              {scoreExplanation.map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: s.color,
                    opacity: homeScore >= s.range[0] ? 1 : 0.2,
                    transition: "opacity 0.5s",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              {["0", "25", "50", "75", "90", "100"].map((n) => (
                <span key={n} style={{ fontSize: 9, color: GREY }}>
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Criteria bars */}
          {[
            {
              label: "Ahorro acumulado",
              val: Math.min(40, Math.round(progress * 0.4)),
              max: 40,
              desc: `${animProg.toFixed(0)}% del objetivo`,
              tip: "Ahorra más cada mes para subir este criterio",
            },
            {
              label: "Ritmo mensual",
              val: Math.min(20, Math.round((monthlyInput / 500) * 20)),
              max: 20,
              desc: `${formatEuro(monthlyInput)}/mes`,
              tip: "500€/mes o más da la puntuación máxima",
            },
            {
              label: "Edad / Aval ICO",
              val: age <= 35 ? 15 : age <= 40 ? 8 : 3,
              max: 15,
              desc:
                age <= 35
                  ? "✅ Accedes al aval ICO"
                  : "⚠️ Sin aval ICO estatal",
              tip: "El aval ICO es solo para menores de 35 años",
            },
            {
              label: "Fondo de emergencia",
              val: hasEmergency ? 15 : 0,
              max: 15,
              desc: hasEmergency
                ? "✅ 3 meses de gastos cubiertos"
                : "⚠️ Sin fondo de emergencia",
              tip: "Tener 3 meses de gastos ahorrados aparte",
            },
            {
              label: "Plazo estimado",
              val:
                monthsLeft && monthsLeft <= 24
                  ? 10
                  : monthsLeft && monthsLeft <= 36
                  ? 6
                  : monthsLeft && monthsLeft <= 60
                  ? 3
                  : 0,
              max: 10,
              desc: yearsLeft ? `Llegas en ${yearsLeft} años` : "—",
              tip: "Menos de 2 años da la puntuación máxima",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                marginBottom: 14,
                padding: "10px 12px",
                background: "#F5F7FA",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: BURGUNDY }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: item.val === item.max ? GREEN : BURGUNDY,
                  }}
                >
                  {item.val}/{item.max} pts
                </span>
              </div>
              <div
                style={{
                  background: "#E0E8F0",
                  borderRadius: 100,
                  height: 6,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 100,
                    background: item.val === item.max ? GREEN : BURGUNDY,
                    width: `${(item.val / item.max) * 100}%`,
                    transition: "width 0.5s",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: GREY }}>{item.desc}</span>
                {item.val < item.max && (
                  <span style={{ fontSize: 10, color: GREEN }}>
                    💡 {item.tip}
                  </span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {card(
        <>
          {sectionTitle("Ajusta tu perfil")}
          {numInput("Tu edad", age, setAge, 18, 50, 1, (v) => v, "", " años")}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREY }}>
                Tengo fondo de emergencia (3 meses de gastos)
              </div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                Suma 15 puntos al Home Score
              </div>
            </div>
            <button
              onClick={() => setHasEmergency(!hasEmergency)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: hasEmergency ? GREEN : "#d1d5db",
                transition: "background 0.3s",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 3,
                  left: hasEmergency ? 23 : 3,
                  transition: "left 0.3s",
                }}
              />
            </button>
          </div>
        </>
      )}

      {/* Greeting if name provided */}
      {userName &&
        card(
          <div style={{ textAlign: "center", padding: "4px 0" }}>
            <div style={{ fontSize: 14, color: BURGUNDY, fontWeight: 600 }}>
              {userName}, tu puntuación actual es{" "}
              <strong style={{ color: scoreColor }}>{homeScore}/100</strong>
            </div>
            <div style={{ fontSize: 12, color: GREY, marginTop: 4 }}>
              Sigue ahorrando para mejorarla cada mes 💪
            </div>
          </div>
        )}
    </>
  );

  // ── TAB 2: AYUDAS ───────────────────────────────────────────
  const AYUDAS_COMPLETAS = {
    Madrid: [
      {
        name: "Aval ICO Primera Vivienda",
        desc: "El Estado avala hasta el 20% de la hipoteca, permitiendo comprar sin el 20% de entrada.",
        tag: "Estatal",
        color: BURGUNDY,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
      {
        name: "Deducción IRPF Comunidad de Madrid",
        desc: "Deducción del 5% en la cuota íntegra autonómica por adquisición de primera vivienda habitual.",
        tag: "Autonómica",
        color: "#1565C0",
        maxEdad: 99,
        maxIngresos: 99999,
        reqPrimera: true,
      },
      {
        name: "Plan Estatal de Vivienda — ayuda directa",
        desc: "Ayudas directas para jóvenes en zonas tensionadas, hasta 10.800€ según ingresos.",
        tag: "Estatal",
        color: GREEN,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
    ],
    Barcelona: [
      {
        name: "Aval ICO Primera Vivienda",
        desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
        tag: "Estatal",
        color: BURGUNDY,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
      {
        name: "Ajuts al lloguer joves (Cataluña)",
        desc: "Subvención del 20% del alquiler para jóvenes hasta 35 años con ingresos limitados.",
        tag: "Autonómica",
        color: "#1565C0",
        maxEdad: 35,
        maxIngresos: 24000,
        reqPrimera: false,
      },
      {
        name: "Préstamos a tipo cero Ajuntament",
        desc: "Préstamos sin interés para la entrada de primera vivienda en Barcelona ciudad.",
        tag: "Local",
        color: GREEN,
        maxEdad: 40,
        maxIngresos: 45000,
        reqPrimera: true,
      },
    ],
    Valencia: [
      {
        name: "Aval ICO Primera Vivienda",
        desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
        tag: "Estatal",
        color: BURGUNDY,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
      {
        name: "Ajudes Habitatge GVA",
        desc: "Subvenciones de la Generalitat Valenciana para adquisición de primera vivienda, hasta 11.000€.",
        tag: "Autonómica",
        color: "#1565C0",
        maxEdad: 40,
        maxIngresos: 30000,
        reqPrimera: true,
      },
    ],
    Sevilla: [
      {
        name: "Aval ICO Primera Vivienda",
        desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
        tag: "Estatal",
        color: BURGUNDY,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
      {
        name: "Plan Vive Andalucía",
        desc: "Programa de vivienda protegida y ayudas a la compra para jóvenes andaluces.",
        tag: "Autonómica",
        color: "#1565C0",
        maxEdad: 35,
        maxIngresos: 30000,
        reqPrimera: true,
      },
    ],
    Bilbao: [
      {
        name: "Aval ICO Primera Vivienda",
        desc: "El Estado avala hasta el 20% de la hipoteca para menores de 35 años.",
        tag: "Estatal",
        color: BURGUNDY,
        maxEdad: 35,
        maxIngresos: 37800,
        reqPrimera: true,
      },
      {
        name: "Etxebide — Vivienda País Vasco",
        desc: "Sistema público vasco de acceso a vivienda protegida con precios por debajo de mercado.",
        tag: "Autonómica",
        color: "#1565C0",
        maxEdad: 99,
        maxIngresos: 45000,
        reqPrimera: true,
      },
      {
        name: "Deducción IRPF Foral 18%",
        desc: "Deducción del 18% en IRPF por adquisición de primera vivienda habitual en territorio foral.",
        tag: "Autonómica",
        color: GREEN,
        maxEdad: 99,
        maxIngresos: 99999,
        reqPrimera: true,
      },
    ],
  };

  const todasAyudas = AYUDAS_COMPLETAS[ciudad] || [];
  const ayudasSi = todasAyudas.filter(
    (a) =>
      age <= a.maxEdad &&
      ingresos <= a.maxIngresos &&
      (!a.reqPrimera || primeraViv)
  );
  const ayudasNo = todasAyudas.filter(
    (a) =>
      !(
        age <= a.maxEdad &&
        ingresos <= a.maxIngresos &&
        (!a.reqPrimera || primeraViv)
      )
  );

  const avalICOPanel = showAvalICO ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={() => setShowAvalICO(false)}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px 32px",
          maxWidth: 480,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: BURGUNDY }}>
              Aval ICO — Guía completa
            </div>
            <div style={{ fontSize: 11, color: GREY, marginTop: 2 }}>
              Vigente hasta diciembre 2027
            </div>
          </div>
          <button
            onClick={() => setShowAvalICO(false)}
            style={{
              background: "#F5F7FA",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 16,
              color: GREY,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            background: "#F5F7FA",
            borderRadius: 12,
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: BURGUNDY,
              marginBottom: 6,
            }}
          >
            💡 ¿Qué es?
          </div>
          <div style={{ fontSize: 12, color: GREY, lineHeight: 1.6 }}>
            El Estado avala hasta el{" "}
            <strong style={{ color: BURGUNDY }}>
              20% del precio de tu piso
            </strong>{" "}
            para que el banco te financie el 100% sin necesitar la entrada. Tú
            solo pagas los gastos (notaría, impuestos, ~10-12%).
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: BURGUNDY,
              marginBottom: 10,
            }}
          >
            ✅ Requisitos
          </div>
          {[
            {
              icon: "🎂",
              label: "Edad",
              val: "Menor de 35 años (o familia con hijos a cargo)",
            },
            {
              icon: "💰",
              label: "Ingresos",
              val: "Menos de 37.800€/año brutos individuales",
            },
            {
              icon: "🏠",
              label: "Primera vivienda",
              val: "Debe ser tu residencia habitual mínimo 10 años",
            },
            {
              icon: "💶",
              label: "Precio máximo",
              val: "Hasta 325.000€ (varía por comunidad autónoma)",
            },
            {
              icon: "📋",
              label: "Sin otra vivienda",
              val: "No puedes ser propietario de otro inmueble",
            },
            {
              icon: "🏦",
              label: "CIRBE limpio",
              val: "Sin deudas en el registro de riesgos bancarios",
            },
            {
              icon: "📍",
              label: "Residencia",
              val: "Legal en España de forma continua los 2 años previos",
            },
          ].map(({ icon, label, val }) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                marginBottom: 8,
                padding: "8px 10px",
                background: "#F5F7FA",
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: BURGUNDY }}>
                  {label}
                </div>
                <div style={{ fontSize: 11, color: GREY, marginTop: 1 }}>
                  {val}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: BURGUNDY,
              marginBottom: 10,
            }}
          >
            📋 Pasos a seguir
          </div>
          {[
            {
              n: "1",
              title: "Comprueba que cumples los requisitos",
              desc: "Edad, ingresos, patrimonio y situación de vivienda. HomeVest te ayuda a verificarlo.",
            },
            {
              n: "2",
              title: "Elige la vivienda",
              desc: "Precio máximo según tu comunidad autónoma. Debe ser tu residencia habitual.",
            },
            {
              n: "3",
              title: "Prepara la documentación y pide pre-aprobación",
              desc: "DNI, nóminas o IRPF, contrato laboral y vida laboral. Pide al banco una pre-aprobación ANTES de firmar arras — así sabes que cumples los requisitos sin comprometerte. Si firmas arras, incluye siempre una cláusula resolutoria por denegación de hipoteca para recuperar el dinero si el aval no se concede.",
            },
            {
              n: "4",
              title: "Acude a un banco adherido",
              desc: "Más de 60 entidades: CaixaBank, BBVA, Santander, Sabadell, Bankinter, Unicaja, Ibercaja... Algunos permiten hacerlo online.",
            },
            {
              n: "5",
              title: "El banco tramita el aval con el ICO",
              desc: "No tienes que ir al ICO. El banco gestiona todo internamente tras aprobar tu perfil.",
            },
            {
              n: "6",
              title: "Firma ante notario",
              desc: "El aval queda reflejado en las escrituras. Tarda entre 4 y 8 semanas.",
            },
          ].map(({ n, title, desc }) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: BURGUNDY,
                  color: "white",
                  fontSize: 12,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {n}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: BURGUNDY,
                    marginBottom: 2,
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 11, color: GREY, lineHeight: 1.5 }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#FFF8E1",
            borderRadius: 12,
            padding: 12,
            borderLeft: "3px solid #F4B942",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#8B6F00",
              marginBottom: 4,
            }}
          >
            ⚠️ Importante
          </div>
          <div style={{ fontSize: 11, color: "#8B6F00", lineHeight: 1.5 }}>
            El aval ICO no garantiza que el banco te conceda la hipoteca. El
            banco hace su propio análisis de riesgo. HomeVest te prepara el
            perfil para maximizar las probabilidades de aprobación.
          </div>
        </div>
        <button
          onClick={() => setShowAvalICO(false)}
          style={{
            width: "100%",
            background: BURGUNDY,
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px 0",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Entendido — volver a mis ayudas
        </button>
      </div>
    </div>
  ) : null;

  const tabAyudas = (
    <>
      {card(
        <>
          {sectionTitle("Tu perfil para ayudas")}
          <p style={{ fontSize: 12, color: GREY, margin: "0 0 14px" }}>
            Usamos tus datos del simulador. Solo dinos tus ingresos y si es tu
            primera vivienda.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {[
              ["Edad", `${age} años`],
              ["Ciudad", ciudad],
              ["Ahorro", formatEuro(savedAmount)],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  background: "#F5F7FA",
                  borderRadius: 10,
                  padding: "8px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: GREY,
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: BURGUNDY }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
          {numInput(
            "Ingresos anuales brutos",
            ingresos,
            setIngresos,
            10000,
            80000,
            1000,
            formatEuro,
            "",
            "/año"
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderTop: "1px solid #E0E8F0",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREY }}>
                ¿Es tu primera vivienda?
              </div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                Muchas ayudas solo aplican a primera compra
              </div>
            </div>
            <button
              onClick={() => setPrimeraViv(!primeraViv)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: primeraViv ? GREEN : "#d1d5db",
                transition: "background 0.3s",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 3,
                  left: primeraViv ? 23 : 3,
                  transition: "left 0.3s",
                }}
              />
            </button>
          </div>
        </>
      )}

      {card(
        <>
          {sectionTitle(`✅ Ayudas a las que accedes (${ayudasSi.length})`)}
          {ayudasSi.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
                color: GREY,
                fontSize: 13,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>😕</div>
              No hemos encontrado ayudas para tu perfil en {ciudad}.<br />
              Prueba ajustando los filtros.
            </div>
          ) : (
            ayudasSi.map((a, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i < ayudasSi.length - 1 ? 12 : 0,
                  padding: 14,
                  background: "#F5F7FA",
                  borderRadius: 12,
                  borderLeft: `3px solid ${a.color}`,
                }}
              >
                <span
                  style={{
                    background: a.color,
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 100,
                    display: "inline-block",
                    marginBottom: 6,
                  }}
                >
                  {a.tag}
                </span>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: BURGUNDY,
                    marginBottom: 4,
                  }}
                >
                  {a.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: GREY,
                    lineHeight: 1.6,
                    marginBottom: a.name.includes("Aval ICO") ? 10 : 0,
                  }}
                >
                  {a.desc}
                </div>
                {a.name.includes("Aval ICO") && (
                  <button
                    onClick={() => setShowAvalICO(true)}
                    style={{
                      background: BURGUNDY,
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    📋 Ver requisitos y pasos →
                  </button>
                )}
              </div>
            ))
          )}
        </>
      )}

      {ayudasNo.length > 0 &&
        card(
          <>
            {sectionTitle(
              `❌ Ayudas a las que no accedes (${ayudasNo.length})`
            )}
            {ayudasNo.map((a, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i < ayudasNo.length - 1 ? 10 : 0,
                  padding: 12,
                  background: "#fafafa",
                  borderRadius: 12,
                  borderLeft: "3px solid #e0e0e0",
                  opacity: 0.65,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: GREY,
                    marginBottom: 3,
                  }}
                >
                  {a.name}
                </div>
                <div style={{ fontSize: 11, color: "#aaa" }}>
                  {age > a.maxEdad
                    ? `Requiere menos de ${a.maxEdad} años`
                    : ingresos > a.maxIngresos
                    ? `Requiere ingresos inferiores a ${formatEuro(
                        a.maxIngresos
                      )}/año`
                    : !primeraViv && a.reqPrimera
                    ? "Solo para primera vivienda"
                    : "No cumples los requisitos"}
                </div>
              </div>
            ))}
          </>
        )}
    </>
  );

  // ── TAB 3: COMPRAR vs ALQUILAR ──────────────────────────────
  const tabCvA = (
    <>
      {card(
        <>
          {sectionTitle("¿Te sale mejor comprar o alquilar?")}
          {numInput(
            "Alquiler mensual actual",
            monthlyRent,
            setMonthlyRent,
            400,
            2500,
            50,
            formatEuro,
            "",
            "/mes"
          )}
          {numInput(
            "Precio del piso que comprarías",
            pisoPrice,
            setPisoPrice,
            80000,
            600000,
            5000,
            formatEuro
          )}
        </>
      )}
      {card(
        <>
          {sectionTitle("Comparativa a 10 años")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                background: "#F0F4FF",
                borderRadius: 14,
                padding: 16,
                border: `1.5px solid #C8D5E8`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: GREY,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                🏠 COMPRANDO
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: BURGUNDY,
                  marginBottom: 4,
                }}
              >
                {formatEuro(Math.round(cvA.cuotaMensual))}/mes
              </div>
              <div style={{ fontSize: 11, color: GREY }}>
                Cuota hipoteca estimada
              </div>
              <div
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid #C8D5E8",
                }}
              >
                <div style={{ fontSize: 11, color: GREY }}>
                  Patrimonio ganado en 10 años
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: GREEN }}>
                  +{formatEuro(Math.round(cvA.patrimonioCompra10))}
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 14,
                padding: 16,
                border: "1.5px solid #e0e0e0",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: GREY,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                📋 ALQUILANDO
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: GREY,
                  marginBottom: 4,
                }}
              >
                {formatEuro(monthlyRent)}/mes
              </div>
              <div style={{ fontSize: 11, color: GREY }}>Alquiler mensual</div>
              <div
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <div style={{ fontSize: 11, color: GREY }}>
                  Patrimonio ganado en 10 años
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 800, color: "#c62828" }}
                >
                  0€
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: BURGUNDY,
              borderRadius: 14,
              padding: 16,
              color: "white",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              💡 Conclusión
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.9 }}>
              {cvA.cuotaMensual < monthlyRent
                ? `La cuota hipotecaria (${formatEuro(
                    Math.round(cvA.cuotaMensual)
                  )}/mes) sería menor que tu alquiler actual. Además generas patrimonio. Tiene sentido comprar.`
                : `La cuota hipotecaria (${formatEuro(
                    Math.round(cvA.cuotaMensual)
                  )}/mes) es mayor que tu alquiler. Pero en 10 años habrás generado ${formatEuro(
                    Math.round(cvA.patrimonioCompra10)
                  )} de patrimonio que alquilando nunca tendrías.`}
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              background: "#F0F4FF",
              borderRadius: 14,
              padding: 14,
              border: `1.5px solid #C8D5E8`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: BURGUNDY,
                marginBottom: 4,
              }}
            >
              📅 ¿Cuándo podrías comprar?
            </div>
            <div style={{ fontSize: 12, color: GREY }}>
              {cvA.mesesHastaEntrada < 999
                ? `Con tu ahorro actual de ${formatEuro(
                    monthlyInput
                  )}/mes, tendrías la entrada en ${(
                    cvA.mesesHastaEntrada / 12
                  ).toFixed(1)} años.`
                : "Introduce tu ahorro mensual en el Simulador para ver cuándo podrías comprar."}
            </div>
          </div>
        </>
      )}
    </>
  );

  // ── TAB 4: HIPOTECA ─────────────────────────────────────────
  const capital = Math.max(0, pisoPrice - savedAmount);
  const plazoAnios = 30;
  const BANCOS = [
    {
      nombre: "CaixaBank",
      fijo: 3.2,
      variable: 1.99,
      mixto: 2.45,
      vinculaciones: "Nómina + seguro hogar + vida",
      comision: "0%",
    },
    {
      nombre: "BBVA",
      fijo: 3.35,
      variable: 2.1,
      mixto: 2.6,
      vinculaciones: "Nómina + seguro hogar",
      comision: "0%",
    },
    {
      nombre: "Santander",
      fijo: 3.15,
      variable: 1.95,
      mixto: 2.4,
      vinculaciones: "Nómina + tarjeta + seguro",
      comision: "0%",
    },
    {
      nombre: "Sabadell",
      fijo: 3.4,
      variable: 2.2,
      mixto: 2.55,
      vinculaciones: "Nómina + seguro hogar",
      comision: "0%",
    },
    {
      nombre: "Bankinter",
      fijo: 3.1,
      variable: 1.9,
      mixto: 2.35,
      vinculaciones: "Nómina + seguro vida + hogar",
      comision: "0,25%",
    },
    {
      nombre: "Openbank",
      fijo: 3.05,
      variable: 1.85,
      mixto: 2.3,
      vinculaciones: "Solo nómina",
      comision: "0%",
    },
  ];

  const calcCuota = (capital, tasa, anos) => {
    const r = tasa / 100 / 12;
    const n = anos * 12;
    if (r === 0) return capital / n;
    return (capital * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const tasaBest = Math.min(...BANCOS.map((b) => b[tipoHipo]));
  const cuotaBest = calcCuota(capital, tasaBest, plazo);
  const totalPagadoBest = cuotaBest * plazo * 12;
  const interesesBest = totalPagadoBest - capital;

  // Perfil hipotecario
  const ratioEndeudamiento =
    ingresos > 0 ? ((cuotaBest * 12) / ingresos) * 100 : 0;
  const perfilScore = (() => {
    let s = 0;
    if (ratioEndeudamiento <= 30) s += 40;
    else if (ratioEndeudamiento <= 35) s += 25;
    else s += 5;
    if (savedAmount >= totalNeeded) s += 30;
    else if (savedAmount >= totalNeeded * 0.5) s += 15;
    if (age <= 35) s += 15;
    else if (age <= 45) s += 10;
    if (hasEmergency) s += 15;
    return Math.min(100, s);
  })();
  const perfilLabel =
    perfilScore >= 75
      ? "Muy bueno"
      : perfilScore >= 50
      ? "Aceptable"
      : "Mejorable";
  const perfilColor =
    perfilScore >= 75 ? GREEN : perfilScore >= 50 ? "#F4B942" : "#C62828";

  const tabHipoteca = (
    <>
      {/* Calculadora */}
      {card(
        <>
          {sectionTitle("Calculadora de hipoteca")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {[
              ["fijo", "Fijo"],
              ["variable", "Variable"],
              ["mixto", "Mixto"],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTipoHipo(val)}
                style={{
                  padding: "8px 0",
                  borderRadius: 10,
                  border: `1.5px solid ${
                    tipoHipo === val ? BURGUNDY : "#E0E8F0"
                  }`,
                  background: tipoHipo === val ? BURGUNDY : "white",
                  color: tipoHipo === val ? "white" : GREY,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {numInput(
            "Plazo de la hipoteca",
            plazo,
            setPlazo,
            10,
            35,
            5,
            (v) => v,
            "",
            " años"
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {[
              ["Capital a financiar", formatEuro(capital)],
              ["Mejor tasa disponible", `${tasaBest.toFixed(2)}%`],
              ["Cuota mensual estimada", formatEuro(Math.round(cuotaBest))],
              [
                "Total intereses pagados",
                formatEuro(Math.round(interesesBest)),
              ],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  background: "#F5F7FA",
                  borderRadius: 12,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: GREY,
                    marginBottom: 3,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: BURGUNDY }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#EDF4EE",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 12,
              color: "#1B4A2A",
              borderLeft: `3px solid ${GREEN}`,
            }}
          >
            💡 Con el aval ICO podrías financiar hasta el 100% sin necesitar la
            entrada
          </div>
        </>
      )}

      {/* Comparador bancos */}
      {card(
        <>
          {sectionTitle(`Comparador de bancos — tipo ${tipoHipo}`)}
          <p style={{ fontSize: 12, color: GREY, margin: "0 0 14px" }}>
            Condiciones orientativas para primera vivienda. La tasa final
            depende de tu perfil.
          </p>
          {[...BANCOS]
            .sort((a, b) => a[tipoHipo] - b[tipoHipo])
            .map((banco, i) => {
              const cuota = calcCuota(capital, banco[tipoHipo], plazo);
              const isBest = i === 0;
              return (
                <div
                  key={banco.nombre}
                  style={{
                    marginBottom: 10,
                    padding: "12px 14px",
                    background: isBest ? "#EDF4EE" : "#F5F7FA",
                    borderRadius: 12,
                    border: isBest
                      ? `1.5px solid ${GREEN}`
                      : "1.5px solid transparent",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: BURGUNDY,
                        }}
                      >
                        {banco.nombre}
                      </span>
                      {isBest && (
                        <span
                          style={{
                            background: GREEN,
                            color: "white",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 100,
                          }}
                        >
                          MEJOR OPCIÓN
                        </span>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: isBest ? GREEN : BURGUNDY,
                        }}
                      >
                        {banco[tipoHipo].toFixed(2)}%
                      </div>
                      <div style={{ fontSize: 10, color: GREY }}>
                        {formatEuro(Math.round(cuota))}/mes
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: GREY }}>
                    <span style={{ marginRight: 10 }}>
                      📋 {banco.vinculaciones}
                    </span>
                    <span>💶 Comisión apertura: {banco.comision}</span>
                  </div>
                </div>
              );
            })}
        </>
      )}

      {/* Perfil hipotecario */}
      {card(
        <>
          {sectionTitle("Mi perfil hipotecario")}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 80,
                height: 80,
                flexShrink: 0,
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#E0E8F0"
                  strokeWidth="7"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke={perfilColor}
                  strokeWidth="7"
                  strokeDasharray={`${(perfilScore / 100) * 188.5} 188.5`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition: "stroke-dasharray 0.8s" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 800, color: perfilColor }}
                >
                  {perfilScore}
                </span>
                <span style={{ fontSize: 8, color: GREY }}>/ 100</span>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: perfilColor,
                  marginBottom: 4,
                }}
              >
                {perfilLabel}
              </div>
              <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>
                {perfilScore >= 75
                  ? "Tu perfil es sólido. Los bancos verán tu solicitud con buenos ojos."
                  : perfilScore >= 50
                  ? "Perfil aceptable. Algunos bancos pueden pedir garantías adicionales."
                  : "Perfil mejorable. Te recomendamos trabajar estos puntos antes de ir al banco."}
              </div>
            </div>
          </div>
          {[
            {
              label: "Ratio de endeudamiento",
              ok: ratioEndeudamiento <= 35,
              desc: `Tu cuota sería el ${ratioEndeudamiento.toFixed(
                0
              )}% de tus ingresos`,
              tip:
                ratioEndeudamiento > 35
                  ? "Los bancos recomiendan no superar el 35% de los ingresos"
                  : "✅ Dentro del límite recomendado (35%)",
            },
            {
              label: "Ahorro acumulado",
              ok: savedAmount >= totalNeeded * 0.5,
              desc: `${formatEuro(savedAmount)} ahorrados de ${formatEuro(
                totalNeeded
              )} necesarios`,
              tip:
                savedAmount < totalNeeded * 0.5
                  ? "Intenta tener al menos el 50% del objetivo antes de pedir hipoteca"
                  : "✅ Buen nivel de ahorro previo",
            },
            {
              label: "Edad",
              ok: age <= 40,
              desc: `${age} años`,
              tip:
                age > 40
                  ? "Los bancos prefieren que la hipoteca termine antes de los 70-75 años"
                  : "✅ Edad favorable para hipoteca a largo plazo",
            },
            {
              label: "Fondo de emergencia",
              ok: hasEmergency,
              desc: hasEmergency
                ? "Tienes colchón de 3 meses"
                : "Sin fondo de emergencia",
              tip: !hasEmergency
                ? "Los bancos valoran positivamente tener reservas adicionales"
                : "✅ Tienes colchón de seguridad",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                marginBottom: 10,
                padding: "10px 12px",
                background: item.ok ? "#EDF4EE" : "#FFF5F5",
                borderRadius: 12,
                borderLeft: `3px solid ${item.ok ? GREEN : "#C62828"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: BURGUNDY }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: 12 }}>{item.ok ? "✅" : "⚠️"}</span>
              </div>
              <div style={{ fontSize: 11, color: GREY, marginBottom: 2 }}>
                {item.desc}
              </div>
              <div style={{ fontSize: 11, color: item.ok ? GREEN : "#C62828" }}>
                {item.tip}
              </div>
            </div>
          ))}
        </>
      )}

      {/* CTA contacto */}
      {card(
        <>
          {sectionTitle("¿Quieres que HomeVest negocie tu hipoteca?")}
          <p
            style={{
              fontSize: 12,
              color: GREY,
              margin: "0 0 16px",
              lineHeight: 1.6,
            }}
          >
            Te conseguimos la mejor hipoteca del mercado sin coste para ti.
            Nuestro honorario lo paga el banco.
          </p>
          {contactSent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: BURGUNDY,
                  marginBottom: 6,
                }}
              >
                ¡Recibido!
              </div>
              <div style={{ fontSize: 12, color: GREY }}>
                Te contactamos en menos de 24 horas.
              </div>
            </div>
          ) : showContactForm ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: GREY,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Nombre
                </label>
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Tu nombre"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #E0E8F0",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: GREY,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Teléfono
                </label>
                <input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Tu teléfono"
                  type="tel"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #E0E8F0",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                onClick={() => {
                  if (contactName && contactPhone) setContactSent(true);
                }}
                style={{
                  width: "100%",
                  background: BURGUNDY,
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Quiero que HomeVest negocie mi hipoteca
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowContactForm(true)}
              style={{
                width: "100%",
                background: BURGUNDY,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "14px 0",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Contactar con un asesor HomeVest
            </button>
          )}
        </>
      )}
    </>
  );

  const tabs = [tabSimulador, tabHomeScore, tabAyudas, tabCvA, tabHipoteca];

  // ── ONBOARDING ───────────────────────────────────────────────
  if (!onboarded)
    return (
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          minHeight: "100vh",
          background: "#1B2A4A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <svg
          width="200"
          height="36"
          viewBox="0 0 200 36"
          style={{ marginBottom: 40 }}
        >
          <polyline
            points="2,18 11,6 20,18"
            fill="none"
            stroke="white"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line
            x1="4.4"
            y1="16.5"
            x2="4.4"
            y2="30"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <line
            x1="17.6"
            y1="16.5"
            x2="17.6"
            y2="30"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <line
            x1="4.4"
            y1="23"
            x2="17.6"
            y2="23"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="8.5" y="11" width="5" height="5" fill="#4A9B5F" rx="0.8" />
          <text
            x="21"
            y="30"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontWeight="700"
            fontSize="18"
            fill="white"
          >
            OME<tspan fill="#4A9B5F">VEST</tspan>
          </text>
        </svg>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Deja de pagar
            <br />
            el piso de otro
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Te acompañamos desde el primer euro
            <br />
            hasta las llaves de tu primera vivienda
          </p>
        </div>
        <div style={{ width: "100%", maxWidth: 360, marginBottom: 40 }}>
          {[
            {
              icon: "🏗️",
              title: "Simula tu casa",
              desc: "Ve cómo crece tu hogar mientras ahorras",
            },
            {
              icon: "🎯",
              title: "Tu Home Score",
              desc: "Mide tu preparación para comprar mes a mes",
            },
            {
              icon: "🎁",
              title: "Ayudas personalizadas",
              desc: "Descubre las ayudas públicas a las que accedes",
            },
            {
              icon: "📊",
              title: "¿Comprar o alquilar?",
              desc: "Calcula qué te sale mejor según tu situación",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: 14,
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ color: "white", fontSize: 13, fontWeight: 700 }}>
                  {f.title}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 12,
                    marginTop: 1,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", maxWidth: 360, marginBottom: 16 }}>
          <label
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
              letterSpacing: "0.5px",
            }}
          >
            ¿CÓMO TE LLAMAS?
          </label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setOnboarded(true)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "1.5px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={() => setOnboarded(true)}
          style={{
            width: "100%",
            maxWidth: 360,
            background: "#4A9B5F",
            color: "white",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Empezar mi camino →
        </button>
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 11,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Gratuito · Sin registro · Sin compromiso
        </p>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: CREAM,
        minHeight: "100vh",
        paddingBottom: 32,
      }}
    >
      {avalICOPanel}
      {/* Header */}
      <div
        style={{
          background: "#F5ECD9",
          padding: "14px 16px 0",
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid #E8D9C0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 480,
            margin: "0 auto 12px",
          }}
        >
          {/* HomeVest Logo */}
          <svg width="200" height="34" viewBox="0 0 200 34">
            {/* Tejado de la H */}
            <polyline
              points="2,18 11,6 20,18"
              fill="none"
              stroke="#1B2A4A"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Palo izquierdo H */}
            <line
              x1="4.4"
              y1="16.5"
              x2="4.4"
              y2="30"
              stroke="#1B2A4A"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Palo derecho H */}
            <line
              x1="17.6"
              y1="16.5"
              x2="17.6"
              y2="30"
              stroke="#1B2A4A"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Travesaño H */}
            <line
              x1="4.4"
              y1="23"
              x2="17.6"
              y2="23"
              stroke="#1B2A4A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Ventanita */}
            <rect x="8.5" y="11" width="5" height="5" fill="#3A7D44" rx="0.8" />
            {/* OMEVEST todo junto, mismo baseline y=30 que el pie de la H */}
            <text
              x="21"
              y="30"
              fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontWeight="700"
              fontSize="18"
              fill="#1B2A4A"
            >
              OME<tspan fill="#3A7D44">VEST</tspan>
            </text>
          </svg>
          <div style={{ fontSize: 11, color: GREY, textAlign: "right" }}>
            {userName
              ? `Hola, ${userName} 👋`
              : "Deja de pagar el piso de otro"}
          </div>
        </div>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 2,
            maxWidth: 480,
            margin: "0 auto",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                background: "transparent",
                color: activeTab === i ? "#1B2A4A" : GREY,
                border: "none",
                borderBottom:
                  activeTab === i
                    ? "3px solid #1B2A4A"
                    : "3px solid transparent",
                padding: "8px 12px",
                fontSize: 12,
                fontWeight: activeTab === i ? 800 : 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {tabs[activeTab]}
      </div>
    </div>
  );
}
