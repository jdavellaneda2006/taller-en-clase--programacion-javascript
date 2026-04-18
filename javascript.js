let nombre = "";
let edad = 0;
let tipoDocumento = "";
let numeroDocumento = "";

if (edad < 18) {
  alert("No puede continuar, es menor de edad");
} else if (edad < 25) {
  alert("Usuario beneficiario por cotizante");
} else if (edad >= 60) {
  alert("Solo se calculará la pensión, ingrese su mesada pensional");
} else {

  let salario = 0; 
  let comisiones = 0;
  let horasExtras = 0;
  let nivelRiesgo = "";
 
  const SMLV = 1750905;
  const SMIV = 22761765;
  const subsidio_transporte = 249095;
  const UVT = 52.37;

  const ARL_MINIMO = 0.00522;
  const ARL_BAJO = 0.01044;
  const ARL_MEDIO = 0.02436;
  const ARL_ALTO = 0.0435;
  const ARL_MAXIMO = 0.0696;

  const salarioTotal = salario + comisiones + horasExtras;

  const ibc = salarioTotal * 0.7;

  const auxilio = salario <= 2 * SMLV ? subsidio_transporte : 0;

  const salud = ibc * 0.04;
  const pension = ibc * 0.04;

  const fondo = ibc >= 4 * SMLV ? ibc * 0.01 : 0;

  let arl = 0;
  if (nivelRiesgo === "minimo") {
    arl = ibc * ARL_MINIMO;
  } else if (nivelRiesgo === "bajo") {
    arl = ibc * ARL_BAJO;
  } else if (nivelRiesgo === "medio") {
    arl = ibc * ARL_MEDIO;
  } else if (nivelRiesgo === "alto") {
    arl = ibc * ARL_ALTO;
  } else if (nivelRiesgo === "maximo") {
    arl = ibc * ARL_MAXIMO;
  }

  const ingresoGravado = salarioTotal - (salud + pension + fondo + arl);
  const ingresoUVT = ingresoGravado / UVT;
  let retencion = 0;

  if (ingresoUVT > 95 && ingresoUVT <= 150) {
    retencion = (ingresoUVT - 95) * 0.19 * UVT;
  } else if (ingresoUVT > 150 && ingresoUVT <= 360) {
    retencion = ((ingresoUVT - 150) * 0.28 + 10) * UVT;
  } else if (ingresoUVT > 360 && ingresoUVT <= 640) {
    retencion = ((ingresoUVT - 360) * 0.33 + 69) * UVT;
  } else if (ingresoUVT > 640 && ingresoUVT <= 945) {
    retencion = ((ingresoUVT - 640) * 0.35 + 162) * UVT;
  } else if (ingresoUVT > 945 && ingresoUVT <= 2300) {
    retencion = ((ingresoUVT - 945) * 0.37 + 268) * UVT;
  } else if (ingresoUVT > 2300) {
    retencion = ((ingresoUVT - 2300) * 0.39 + 770) * UVT;
  }

  const deducciones = salud + pension + fondo + arl + retencion;
  const total = salarioTotal + auxilio - deducciones;

  console.log("Nombre:", nombre);
  console.log("Edad:", edad);
  console.log("Documento:", tipoDocumento, numeroDocumento);
  console.log("Salario:", salario);
  console.log("IBC:", ibc);
  console.log("Auxilio de transporte:", auxilio);
  console.log("Salud:", salud);
  console.log("Pensión:", pension);
  console.log("Fondo de solidaridad:", fondo);
  console.log("ARL:", arl);
  console.log("Retención en la fuente:", retencion);
  console.log("Deducciones totales:", deducciones);
  console.log("Total neto:", total);
}
