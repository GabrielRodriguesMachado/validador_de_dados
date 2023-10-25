const texto = `CNPJ atual (apenas numeros): 00.000.000/0001-91
CNPJ novo (apenas numeros): 123456777-5442
CPF do novo representante legal (apenas numeros): 025.187.050 85
nome completo do novo representante legal: Anderson Miguel
Data de nascimento do novo representante legal (formato xx/xx/xxx): 01/01/1985
E-mail: anderson@gmail.com
Telefone celular: 51999999999`;

const pfpj = `CNPJ atual (apenas numeros): 00.000.000/0001-91
CPF do novo representante legal (apenas numeros): 025.187.050 85
nome completo do novo representante legal: Anderson Miguel
Data de nascimento do novo representante legal (formato xx/xx/xxx): 01/01/1985
E-mail: anderson@gmail.com
Telefone celular: 51999999999`;

const regex = /\D+/g;
const cnpjAtual = "CNPJ atual (apenas numeros): ";
const cnpjNovo = "CNPJ novo (apenas numeros): ";
const CPFNovoRL = "CPF do novo representante legal (apenas numeros): ";
const CPF = "CPF do representante legal (apenas numeros): ";
const telefoneCelular = "Telefone celular: +55";
const cnpjCpfInvalido = " <- faltando ou sobrando algum digito";

const mapeamentoDePrefixoPJPJ = {
  0: cnpjAtual,
  1: cnpjNovo,
  2: CPFNovoRL,
  6: telefoneCelular
};

const mapeamentoDePrefixoPFPJ = {
  0: cnpjAtual,
  1: CPF,
  5: telefoneCelular
};

let arrayDeLinhas = pfpj.split('\n');

function checkCnpj(value) {
  let isValid = value.replace(regex, '');
  if (isValid.length != 14) {
    return isValid.concat(cnpjCpfInvalido);
  }

  return isValid;
}

function checkCpf(value) {
  let isValid = value.replace(regex, '');
  if (isValid.length != 11) {
    return isValid.concat(cnpjCpfInvalido);
  }

  return isValid;
}

function checkPhoneNumber(value) {
  let isValid = value.replace(regex, '');
  if (isValid.length != 11) {
    return isValid.concat(cnpjCpfInvalido);
  }

  return isValid;
}

function checkDataPJPJ(arr) {
  result = arr.map((linha, i) => {
    const prefixo = mapeamentoDePrefixoPJPJ[i];

    switch (i) {
      case 0:
      case 1:
        return prefixo.concat(checkCnpj(linha))
      case 2:
        return prefixo.concat(checkCpf(linha));
      case 6:
        return prefixo.concat(checkPhoneNumber(linha))
    }
    return linha;
  });

  return result;
}

function checkDataPFPJ(arr) {
  result = arr.map((linha, i) => {
    const prefixo = mapeamentoDePrefixoPFPJ[i];

    switch (i) {
      case 0:
        return prefixo.concat(checkCnpj(linha))
      case 1:
        return prefixo.concat(checkCpf(linha));
      case 5:
        return prefixo.concat(checkPhoneNumber(linha))
    }
    return linha;
  });

  return result;
}

// arrayDeLinhas = checkDataPJPJ(arrayDeLinhas);
arrayDeLinhas = checkDataPFPJ(arrayDeLinhas)

console.log(arrayDeLinhas);
