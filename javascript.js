function mostrarCalculos() {

let nombre = prompt("Ingrese su nombre:");
let edad = parseInt(prompt("Ingrese su edad:"));
let tipoDocumento = prompt("Tipo de documento:");
let numeroDocumento = prompt("Número de documento:")

function calcularSalud(ibc) {
  return ibc * 0.04;
}

function calcularPension(ibc) {
  return ibc * 0.04;
}

function calcularFondo(ibc, SMLV) {
  return ibc >= 4 * SMLV ? ibc * 0.01 : 0;
}

function calcularARL(ibc, nivel, min, bajo, medio, alto, max) {
  if (nivel === "minimo") return ibc * min;
  if (nivel === "bajo") return ibc * bajo;
  if (nivel === "medio") return ibc * medio;
  if (nivel === "alto") return ibc * alto;
  if (nivel === "maximo") return ibc * max;
  return 0;
}

if (edad < 18) {
  alert("No puede continuar, es menor de edad");
} else if (edad < 25) {
  alert("Usuario beneficiario por cotizante");
} else if (edad >= 60) {
  alert("Solo se calculará la pensión, ingrese su mesada pensional");
} else {
  
  let salario = parseFloat(prompt("Ingrese su salario")) || 0; 
  let comisiones = parseFloat(prompt("Ingrese sus comisiones")) || 0;
  let horasExtras = parseFloat(prompt("Ingrese sus horas extras")) || 0;
  let nivelRiesgo = prompt("Nivel de riesgo (minimo, bajo, medio, alto, maximo)").toLowerCase().trim();

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

  
  const salud = calcularSalud(ibc);
  const pension = calcularPension(ibc);
  const fondo = calcularFondo(ibc, SMLV);
  const arl = calcularARL(ibc, nivelRiesgo, ARL_MINIMO, ARL_BAJO, ARL_MEDIO, ARL_ALTO, ARL_MAXIMO);

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
 
  document.getElementById("resultado").innerHTML =
    "Nombre: " + nombre + "<br>" +
    "Edad: " + edad + "<br>" +
    "Documento: " + tipoDocumento + " " + numeroDocumento + "<br><br>" +
    "Salario: " + salario + "<br>" +
    "IBC: " + ibc + "<br>" +
    "Auxilio: " + auxilio + "<br>" +
    "Salud: " + salud + "<br>" +
    "Pensión: " + pension + "<br>" +
    "Fondo: " + fondo + "<br>" +
    "ARL: " + arl + "<br>" +
    "Retención: " + retencion + "<br>" +
    "Deducciones: " + deducciones + "<br>" +
    "Total Neto: " + total;

  console.log("Total neto:", total);
}

}
