import { useState, useMemo } from "react";

const BRAND = {
  bg: "#0a0a0a",
  surface: "#171717",
  surfaceAlt: "#1f1f1f",
  border: "#2a2a2a",
  accent: "#ff7a58",
  accentDim: "#ff7a5833",
  text: "#ffffff",
  textDim: "#a0a0a0",
};

const fontStack = `'Poppins', -apple-system, sans-serif`;
const displayStack = `'Space Grotesk', 'Poppins', sans-serif`;

// ---------- Shared UI ----------
const Field = ({ label, value, onChange, suffix, step = 1, min = 0, hint, subLabel }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{
      display: "block",
      fontSize: 11,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      color: BRAND.textDim,
      marginBottom: 6,
      fontWeight: 500,
    }}>
      {label}
    </label>
    {subLabel && (
      <div style={{
        fontSize: 11,
        color: BRAND.accent,
        marginBottom: 6,
        fontWeight: 500,
      }}>
        {subLabel}
      </div>
    )}
    <div style={{ position: "relative" }}>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9.]/g, "");
          onChange(parseFloat(cleaned) || 0);
        }}
        style={{
          width: "100%",
          background: BRAND.surfaceAlt,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: "12px 14px",
          paddingRight: suffix ? 56 : 14,
          color: BRAND.text,
          fontSize: 15,
          fontFamily: fontStack,
          outline: "none",
          transition: "all 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = BRAND.accent;
          e.target.style.boxShadow = `0 0 0 3px ${BRAND.accentDim}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = BRAND.border;
          e.target.style.boxShadow = "none";
        }}
      />
      {suffix && (
        <span style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: BRAND.accent,
          fontSize: 13,
          fontWeight: 600,
          pointerEvents: "none",
        }}>
          {suffix}
        </span>
      )}
    </div>
    {hint && (
      <div style={{ fontSize: 11, color: BRAND.textDim, marginTop: 4, fontStyle: "italic" }}>
        {hint}
      </div>
    )}
  </div>
);

const Result = ({ label, value, highlight, sub }) => (
  <div style={{
    padding: "16px 18px",
    background: highlight ? BRAND.accent : BRAND.surfaceAlt,
    border: `1px solid ${highlight ? BRAND.accent : BRAND.border}`,
    borderRadius: 10,
    marginBottom: 10,
  }}>
    <div style={{
      fontSize: 10,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      color: highlight ? "#1a0f08" : BRAND.textDim,
      fontWeight: 600,
      marginBottom: 4,
    }}>
      {label}
    </div>
    <div style={{
      fontSize: 26,
      fontFamily: displayStack,
      fontWeight: 700,
      color: highlight ? "#0a0a0a" : BRAND.text,
      lineHeight: 1,
    }}>
      {value}
    </div>
    {sub && (
      <div style={{
        fontSize: 11,
        color: highlight ? "#1a0f08cc" : BRAND.textDim,
        marginTop: 4,
      }}>
        {sub}
      </div>
    )}
  </div>
);

const fmt = (n) => new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(Math.round(n));
const CURRENCY_SYMBOL = { USD: "$", EUR: "€" };
const fmtMoney = (n, currency = "USD") => CURRENCY_SYMBOL[currency] + new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(Math.round(n));

const TicketField = ({ value, onChange, currency, onCurrencyChange }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{
      display: "block",
      fontSize: 11,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      color: BRAND.textDim,
      marginBottom: 6,
      fontWeight: 500,
    }}>
      Ticket promedio de tu solución
    </label>
    <div style={{ position: "relative", display: "flex", gap: 8 }}>
      <div style={{ position: "relative", flex: 1 }}>
        <span style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: BRAND.accent,
          fontSize: 15,
          fontWeight: 600,
          pointerEvents: "none",
        }}>
          {CURRENCY_SYMBOL[currency]}
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9.]/g, "");
            onChange(parseFloat(cleaned) || 0);
          }}
          style={{
            width: "100%",
            background: BRAND.surfaceAlt,
            border: `1px solid ${BRAND.border}`,
            borderRadius: 8,
            padding: "12px 14px 12px 32px",
            color: BRAND.text,
            fontSize: 15,
            fontFamily: fontStack,
            outline: "none",
            transition: "all 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = BRAND.accent;
            e.target.style.boxShadow = `0 0 0 3px ${BRAND.accentDim}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = BRAND.border;
            e.target.style.boxShadow = "none";
          }}
        />
      </div>
      <div style={{
        display: "flex",
        background: BRAND.surfaceAlt,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 8,
        padding: 3,
        gap: 2,
      }}>
        {["USD", "EUR"].map((c) => (
          <button
            key={c}
            onClick={() => onCurrencyChange(c)}
            style={{
              background: currency === c ? BRAND.accent : "transparent",
              color: currency === c ? "#0a0a0a" : BRAND.textDim,
              border: "none",
              padding: "8px 14px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: fontStack,
              letterSpacing: 0.3,
              transition: "all 0.15s",
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ---------- Cold Email Calculator ----------
const ColdEmailCalc = () => {
  const [empresas, setEmpresas] = useState(1000);
  const [ticket, setTicket] = useState(5000);
  const [currency, setCurrency] = useState("USD");
  const [tasaRebote, setTasaRebote] = useState(2);
  const [tasaRespuesta, setTasaRespuesta] = useState(5);
  const [tasaPositiva, setTasaPositiva] = useState(50);
  const [tasaAgendamiento, setTasaAgendamiento] = useState(50);
  const [tasaNoShow, setTasaNoShow] = useState(10);
  const [tasaCierre, setTasaCierre] = useState(30);

  const PERSONAS_POR_EMPRESA = 3;
  const PASOS_CAMPANA = 3;
  const DIAS_HABILES = 20;
  const EMAILS_POR_MAILBOX_DIA = 15;
  const MAILBOXES_POR_DOMINIO = 2;

  const r = useMemo(() => {
    const personas = empresas * PERSONAS_POR_EMPRESA;

    // Emails totales enviados en el mes (personas × pasos de campaña)
    const emailsTotales = personas * PASOS_CAMPANA;
    // Rebotes aplicados sobre el total de emails enviados
    const emailsRebotados = Math.floor(emailsTotales * (tasaRebote / 100));
    const emailsEnBandeja = emailsTotales - emailsRebotados;

    // Funnel sobre personas efectivamente alcanzadas
    const personasEfectivas = Math.floor(personas * (1 - tasaRebote / 100));
    const respuestas = Math.floor(personasEfectivas * (tasaRespuesta / 100));
    const positivas = Math.floor(respuestas * (tasaPositiva / 100));
    const reunionesAgendadas = Math.floor(positivas * (tasaAgendamiento / 100));
    const noShows = Math.floor(reunionesAgendadas * (tasaNoShow / 100));
    const reunionesRealizadas = reunionesAgendadas - noShows;
    const clientes = Math.floor(reunionesRealizadas * (tasaCierre / 100));
    const revenue = clientes * ticket;

    // Infraestructura
    const sendsPorMailboxMes = EMAILS_POR_MAILBOX_DIA * DIAS_HABILES;
    const mailboxes = Math.ceil(emailsTotales / sendsPorMailboxMes);
    const dominios = Math.ceil(mailboxes / MAILBOXES_POR_DOMINIO);

    return {
      personas, emailsTotales, emailsRebotados, emailsEnBandeja,
      respuestas, positivas, reunionesAgendadas, noShows, reunionesRealizadas,
      clientes, revenue, mailboxes, dominios,
    };
  }, [empresas, ticket, tasaRebote, tasaRespuesta, tasaPositiva, tasaAgendamiento, tasaNoShow, tasaCierre]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <SectionTitle>Inputs</SectionTitle>
        <Field
          label="Cantidad de empresas a prospectar"
          value={empresas}
          onChange={setEmpresas}
          subLabel={`→ ${fmt(r.personas)} personas (${PERSONAS_POR_EMPRESA} por empresa)`}
        />
        <TicketField value={ticket} onChange={setTicket} currency={currency} onCurrencyChange={setCurrency} />
        <Field label="Tasa de rebote esperada" value={tasaRebote} onChange={setTasaRebote} suffix="%" />
        <Field label="Tasa de respuesta esperada" value={tasaRespuesta} onChange={setTasaRespuesta} suffix="%" />
        <Field label="Tasa de respuesta positiva" value={tasaPositiva} onChange={setTasaPositiva} suffix="%" />
        <Field label="Tasa de agendamiento" value={tasaAgendamiento} onChange={setTasaAgendamiento} suffix="%" />
        <Field label="Tasa de no-show" value={tasaNoShow} onChange={setTasaNoShow} suffix="%" hint="% de reuniones agendadas que no aparecen" />
        <Field label="Tasa de cierre" value={tasaCierre} onChange={setTasaCierre} suffix="%" hint="% de reuniones realizadas que terminan en cliente" />
      </div>

      <div>
        <SectionTitle>Outputs</SectionTitle>

        {/* Volumen de envío */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <Result label="Emails enviados / mes" value={fmt(r.emailsTotales)} sub={`${fmt(r.personas)} personas × ${PASOS_CAMPANA} pasos`} />
          <Result label="Emails rebotados" value={fmt(r.emailsRebotados)} sub={`Tasa de rebote ${tasaRebote}%`} />
        </div>
        <Result label="Emails que llegan a bandeja de entrada" value={fmt(r.emailsEnBandeja)} sub="Total enviados menos rebotados" />

        {/* Respuestas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <Result label="Respuestas totales / mes" value={fmt(r.respuestas)} />
          <Result label="Respuestas positivas / mes" value={fmt(r.positivas)} />
        </div>

        {/* Reuniones y cierre */}
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Result label="Reuniones agendadas / mes" value={fmt(r.reunionesAgendadas)} />
            <Result label="No-shows / mes" value={fmt(r.noShows)} sub={`No-show ${tasaNoShow}%`} />
          </div>
          <Result label="Reuniones realizadas / mes" value={fmt(r.reunionesRealizadas)} />
          <Result label="Clientes generados / mes" value={fmt(r.clientes)} sub={`Tasa de cierre ${tasaCierre}% sobre reuniones realizadas`} />
          <Result label="Revenue proyectado / mes" value={fmtMoney(r.revenue, currency)} highlight />
        </div>

        {/* Infraestructura */}
        <div style={{
          marginTop: 24,
          padding: "22px 24px",
          background: BRAND.surfaceAlt,
          border: `1px dashed ${BRAND.accent}`,
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: BRAND.accent,
            fontWeight: 600,
            marginBottom: 14,
          }}>
            Infraestructura necesaria
          </div>
          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 32, fontFamily: displayStack, fontWeight: 700, color: BRAND.text, lineHeight: 1 }}>{r.mailboxes}</div>
              <div style={{ fontSize: 12, color: BRAND.textDim, marginTop: 4 }}>Mailboxes</div>
            </div>
            <div style={{ width: 1, background: BRAND.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 32, fontFamily: displayStack, fontWeight: 700, color: BRAND.text, lineHeight: 1 }}>{r.dominios}</div>
              <div style={{ fontSize: 12, color: BRAND.textDim, marginTop: 4 }}>Dominios</div>
            </div>
          </div>
          <div style={{
            fontSize: 12,
            color: BRAND.textDim,
            lineHeight: 1.7,
            paddingTop: 14,
            borderTop: `1px solid ${BRAND.border}`,
          }}>
            <div>• {EMAILS_POR_MAILBOX_DIA} emails por día por mailbox</div>
            <div>• {MAILBOXES_POR_DOMINIO} mailboxes por dominio</div>
            <div>• Campañas de {PASOS_CAMPANA} pasos</div>
            <div>• {DIAS_HABILES} días hábiles al mes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- LinkedIn Calculator ----------
const LinkedInCalc = () => {
  const [empresas, setEmpresas] = useState(1000);
  const [ticket, setTicket] = useState(5000);
  const [currency, setCurrency] = useState("USD");
  const [tasaAceptacion, setTasaAceptacion] = useState(30);
  const [tasaRespuesta, setTasaRespuesta] = useState(30);
  const [tasaPositiva, setTasaPositiva] = useState(10);
  const [tasaAgendamiento, setTasaAgendamiento] = useState(50);
  const [tasaNoShow, setTasaNoShow] = useState(10);
  const [tasaCierre, setTasaCierre] = useState(30);
  const [conexionesPorCuenta, setConexionesPorCuenta] = useState(15);

  const PERSONAS_POR_EMPRESA_LI = 3;
  const MENSAJES_SECUENCIA = 4;
  const DIAS_HABILES_LI = 20;
  const MAX_CONEXIONES_SEMANA = 200;

  const r = useMemo(() => {
    const personas = empresas * PERSONAS_POR_EMPRESA_LI;
    const conexionesEnviadas = personas;
    const conectados = Math.floor(conexionesEnviadas * (tasaAceptacion / 100));
    const mensajesEnviados = conectados * MENSAJES_SECUENCIA;
    const respuestas = Math.floor(conectados * (tasaRespuesta / 100));
    const positivas = Math.floor(respuestas * (tasaPositiva / 100));
    const reunionesAgendadas = Math.floor(positivas * (tasaAgendamiento / 100));
    const noShows = Math.floor(reunionesAgendadas * (tasaNoShow / 100));
    const reunionesRealizadas = reunionesAgendadas - noShows;
    const clientes = Math.floor(reunionesRealizadas * (tasaCierre / 100));
    const revenue = clientes * ticket;

    const cuentas = Math.ceil(personas / (conexionesPorCuenta * DIAS_HABILES_LI));
    const peligroso = conexionesPorCuenta > 15;
    const excedeLimite = conexionesPorCuenta * 5 > MAX_CONEXIONES_SEMANA;

    return {
      personas, conexionesEnviadas, conectados, mensajesEnviados,
      respuestas, positivas, reunionesAgendadas, noShows, reunionesRealizadas,
      clientes, revenue, cuentas, peligroso, excedeLimite,
    };
  }, [empresas, ticket, tasaAceptacion, tasaRespuesta, tasaPositiva, tasaAgendamiento, tasaNoShow, tasaCierre, conexionesPorCuenta]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <SectionTitle>Inputs</SectionTitle>
        <Field
          label="Cantidad de empresas a prospectar"
          value={empresas}
          onChange={setEmpresas}
          subLabel={`→ ${fmt(empresas * PERSONAS_POR_EMPRESA_LI)} personas (${PERSONAS_POR_EMPRESA_LI} por empresa)`}
        />
        <TicketField value={ticket} onChange={setTicket} currency={currency} onCurrencyChange={setCurrency} />
        <Field
          label="Conexiones por cuenta / día"
          value={conexionesPorCuenta}
          onChange={setConexionesPorCuenta}
          hint={
            r.excedeLimite
              ? "⚠ Supera el límite de LinkedIn (200/semana). Bajá a 26 máximo."
              : r.peligroso
              ? "⚠ Peligroso. Se recomienda dejarlo en 15 para evitar restricciones."
              : "Recomendado: 15/día. Máximo absoluto: 26/día (200/semana)."
          }
        />
        <Field label="Tasa de aceptación" value={tasaAceptacion} onChange={setTasaAceptacion} suffix="%" />
        <Field label="Tasa de respuesta" value={tasaRespuesta} onChange={setTasaRespuesta} suffix="%" />
        <Field label="Tasa de respuesta positiva" value={tasaPositiva} onChange={setTasaPositiva} suffix="%" />
        <Field label="Tasa de agendamiento" value={tasaAgendamiento} onChange={setTasaAgendamiento} suffix="%" />
        <Field label="Tasa de no-show" value={tasaNoShow} onChange={setTasaNoShow} suffix="%" hint="% de reuniones agendadas que no aparecen" />
        <Field label="Tasa de cierre" value={tasaCierre} onChange={setTasaCierre} suffix="%" hint="% de reuniones realizadas que terminan en cliente" />
      </div>

      <div>
        <SectionTitle>Outputs</SectionTitle>

        {/* Volumen de envío */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <Result label="Conexiones enviadas / mes" value={fmt(r.conexionesEnviadas)} sub={`${fmt(r.personas)} personas`} />
          <Result label="Prospectos conectados / mes" value={fmt(r.conectados)} sub={`Aceptación ${tasaAceptacion}%`} />
        </div>
        <Result label="Mensajes enviados / mes" value={fmt(r.mensajesEnviados)} sub={`${fmt(r.conectados)} conectados × ${MENSAJES_SECUENCIA} mensajes en la secuencia`} />

        {/* Respuestas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <Result label="Respuestas totales / mes" value={fmt(r.respuestas)} />
          <Result label="Respuestas positivas / mes" value={fmt(r.positivas)} />
        </div>

        {/* Reuniones y cierre */}
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Result label="Reuniones agendadas / mes" value={fmt(r.reunionesAgendadas)} />
            <Result label="No-shows / mes" value={fmt(r.noShows)} sub={`No-show ${tasaNoShow}%`} />
          </div>
          <Result label="Reuniones realizadas / mes" value={fmt(r.reunionesRealizadas)} />
          <Result label="Clientes generados / mes" value={fmt(r.clientes)} sub={`Tasa de cierre ${tasaCierre}% sobre reuniones realizadas`} />
          <Result label="Revenue proyectado / mes" value={fmtMoney(r.revenue, currency)} highlight />
        </div>

        {/* Infraestructura */}
        <div style={{
          marginTop: 24,
          padding: "22px 24px",
          background: BRAND.surfaceAlt,
          border: `1px dashed ${BRAND.accent}`,
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: BRAND.accent,
            fontWeight: 600,
            marginBottom: 14,
          }}>
            Infraestructura necesaria
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 32, fontFamily: displayStack, fontWeight: 700, color: BRAND.text, lineHeight: 1 }}>{r.cuentas}</div>
            <div style={{ fontSize: 12, color: BRAND.textDim, marginTop: 4 }}>Cuentas de LinkedIn</div>
          </div>
          <div style={{
            fontSize: 12,
            color: BRAND.textDim,
            lineHeight: 1.7,
            paddingTop: 14,
            borderTop: `1px solid ${BRAND.border}`,
          }}>
            <div>• Límite LinkedIn: {MAX_CONEXIONES_SEMANA} conexiones por semana por cuenta ({MAX_CONEXIONES_SEMANA * 4} al mes)</div>
            <div>• Máximo teórico: 26 conexiones/día (peligroso)</div>
            <div>• Recomendado: 15 conexiones/día para evitar restricciones</div>
            <div>• Secuencia de {MENSAJES_SECUENCIA} mensajes por prospecto conectado</div>
            <div>• {DIAS_HABILES_LI} días hábiles al mes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Cold Calling Calculator ----------
const ColdCallingCalc = () => {
  const [prospectos, setProspectos] = useState(1000);
  const [ticket, setTicket] = useState(5000);
  const [currency, setCurrency] = useState("USD");
  const [tasaCobertura, setTasaCobertura] = useState(30);
  const [tasaContestan, setTasaContestan] = useState(20);
  const [tasaPositiva, setTasaPositiva] = useState(10);
  const [tasaAgendamiento, setTasaAgendamiento] = useState(50);
  const [tasaNoShow, setTasaNoShow] = useState(10);
  const [tasaCierre, setTasaCierre] = useState(30);
  const [llamadasPorSDR, setLlamadasPorSDR] = useState(50);

  const r = useMemo(() => {
    const numerosValidos = Math.floor(prospectos * (tasaCobertura / 100));
    const contestan = Math.floor(numerosValidos * (tasaContestan / 100));
    const positivas = Math.floor(contestan * (tasaPositiva / 100));
    const reunionesAgendadas = Math.floor(positivas * (tasaAgendamiento / 100));
    const noShows = Math.floor(reunionesAgendadas * (tasaNoShow / 100));
    const reunionesRealizadas = reunionesAgendadas - noShows;
    const clientes = Math.floor(reunionesRealizadas * (tasaCierre / 100));
    const revenue = clientes * ticket;

    // SDRs necesarios: prospectos / (llamadas por SDR por día * 20 días)
    const sdrs = Math.ceil(prospectos / (llamadasPorSDR * 20));

    return { numerosValidos, contestan, positivas, reunionesAgendadas, noShows, reunionesRealizadas, clientes, revenue, sdrs };
  }, [prospectos, ticket, tasaCobertura, tasaContestan, tasaPositiva, tasaAgendamiento, tasaNoShow, tasaCierre, llamadasPorSDR]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <SectionTitle>Inputs</SectionTitle>
        <Field label="Prospectos a llamar" value={prospectos} onChange={setProspectos} />
        <TicketField value={ticket} onChange={setTicket} currency={currency} onCurrencyChange={setCurrency} />
        <Field label="Llamadas por SDR / día" value={llamadasPorSDR} onChange={setLlamadasPorSDR} />
        <Field label="Tasa de cobertura (números válidos)" value={tasaCobertura} onChange={setTasaCobertura} suffix="%" />
        <Field label="Tasa de personas que contestan" value={tasaContestan} onChange={setTasaContestan} suffix="%" />
        <Field label="Tasa de respuesta positiva" value={tasaPositiva} onChange={setTasaPositiva} suffix="%" />
        <Field label="Tasa de agendamiento" value={tasaAgendamiento} onChange={setTasaAgendamiento} suffix="%" />
        <Field label="Tasa de no-show" value={tasaNoShow} onChange={setTasaNoShow} suffix="%" hint="% de reuniones agendadas que no aparecen" />
        <Field label="Tasa de cierre" value={tasaCierre} onChange={setTasaCierre} suffix="%" hint="% de reuniones realizadas que terminan en cliente" />
      </div>

      <div>
        <SectionTitle>Outputs</SectionTitle>
        <Result label="Números válidos" value={fmt(r.numerosValidos)} />
        <Result label="Personas que contestan / mes" value={fmt(r.contestan)} />
        <Result label="Respuestas positivas / mes" value={fmt(r.positivas)} />

        <div style={{ marginTop: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Result label="Reuniones agendadas / mes" value={fmt(r.reunionesAgendadas)} />
            <Result label="No-shows / mes" value={fmt(r.noShows)} sub={`No-show ${tasaNoShow}%`} />
          </div>
          <Result label="Reuniones realizadas / mes" value={fmt(r.reunionesRealizadas)} />
          <Result label="Clientes generados / mes" value={fmt(r.clientes)} sub={`Tasa de cierre ${tasaCierre}% sobre reuniones realizadas`} />
          <Result label="Revenue proyectado / mes" value={fmtMoney(r.revenue, currency)} highlight />
        </div>

        <div style={{
          marginTop: 24,
          padding: "22px 24px",
          background: BRAND.surfaceAlt,
          border: `1px dashed ${BRAND.accent}`,
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: BRAND.accent,
            fontWeight: 600,
            marginBottom: 14,
          }}>
            Infraestructura necesaria
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 32, fontFamily: displayStack, fontWeight: 700, color: BRAND.text, lineHeight: 1 }}>{r.sdrs}</div>
            <div style={{ fontSize: 12, color: BRAND.textDim, marginTop: 4 }}>SDRs</div>
          </div>
          <div style={{
            fontSize: 12,
            color: BRAND.textDim,
            lineHeight: 1.7,
            paddingTop: 14,
            borderTop: `1px solid ${BRAND.border}`,
          }}>
            <div>• Máximo teórico: 100 llamadas por día por SDR</div>
            <div>• 20 días hábiles al mes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: BRAND.accent,
    fontWeight: 600,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: `1px solid ${BRAND.border}`,
  }}>
    {children}
  </div>
);

// ---------- Markuo Official Logo ----------
const MARKUO_LOGO = "data:image/png;base64,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";

const MarkuoLogo = ({ height = 44 }) => (
  <img src={MARKUO_LOGO} alt="Markuo" style={{ height, width: "auto", display: "block" }} />
);

// ---------- Main App ----------
export default function App() {
  const [tab, setTab] = useState("email");

  const tabs = [
    { id: "email", label: "Cold Email" },
    { id: "linkedin", label: "LinkedIn Outreach" },
    { id: "calling", label: "Cold Calling" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: BRAND.bg,
      color: BRAND.text,
      fontFamily: fontStack,
      padding: "48px 24px",
      backgroundImage: `radial-gradient(circle at 15% 10%, ${BRAND.accent}0d 0%, transparent 40%), radial-gradient(circle at 85% 90%, ${BRAND.accent}08 0%, transparent 40%)`,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          <MarkuoLogo height={48} />
        </div>
        <div style={{
          fontSize: 13,
          color: BRAND.textDim,
          marginBottom: 4,
          letterSpacing: 0.3,
        }}>
          Sistemas que escalan revenue
        </div>
        <h1 style={{
          fontFamily: displayStack,
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1.05,
          margin: "32px 0 12px",
          letterSpacing: -1.5,
        }}>
          Calculadora <span style={{ color: BRAND.accent }}>Outbound</span>
        </h1>
        <p style={{
          fontSize: 15,
          color: BRAND.textDim,
          maxWidth: 620,
          marginBottom: 40,
          lineHeight: 1.6,
        }}>
          Dimensioná la infraestructura, las reuniones y el revenue proyectado de tus canales de prospección en frío.
        </p>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 4,
          background: BRAND.surface,
          padding: 4,
          borderRadius: 12,
          border: `1px solid ${BRAND.border}`,
          marginBottom: 32,
          width: "fit-content",
        }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? BRAND.accent : "transparent",
                color: tab === t.id ? "#0a0a0a" : BRAND.textDim,
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: fontStack,
                letterSpacing: 0.2,
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: BRAND.surface,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 16,
          padding: 40,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: -60,
            right: -80,
            opacity: 0.05,
            transform: "rotate(-8deg)",
            pointerEvents: "none",
          }}>
            <MarkuoLogo height={220} />
          </div>
          <div style={{ position: "relative" }}>
            {tab === "email" && <ColdEmailCalc />}
            {tab === "linkedin" && <LinkedInCalc />}
            {tab === "calling" && <ColdCallingCalc />}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 32,
          padding: "20px 0",
          borderTop: `1px solid ${BRAND.border}`,
          fontSize: 11,
          color: BRAND.textDim,
          letterSpacing: 1,
          textTransform: "uppercase",
          textAlign: "center",
        }}>
          El sistema visual no decora, estructura información
        </div>
      </div>
    </div>
  );
}
