# FMU Grader
FMU Grader

## How it works:
It uses the `input.pdf` as base form and write the students' grades from `notas.csv` using your signature `assnatura.jpg`. After that it will merge all docs into a single one `notas.pdf`.

## Requirements:
You will need some files in order to make this work. 
- `input.pdf` - "Termo de correção de notas e faltas";
- `assinatura.jpg` - Your signature!
- `notas.csv` - All Students Grades in CSV sheet following this specific format: ```codigoDaDisciplina	nomeAluno	ra	curso	tronco	nomeDaDisciplina	continuada	regimental	exame	turma```

## How to use
Install node.js;
Install java;

```
npm install
node app.js
```
