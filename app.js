var hummus = require("hummus"); // pdf library
var csv = require('csvtojson'); // converter
var fs = require("fs"); // filesystem
var merge = require('easy-pdf-merge');

// crewate eorking kirectory
var dir = './out';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(async () => {
    try {
        const notas = await csv().fromFile('notas.csv');
        processNotas(notas);
    } catch (e) {
        // I wont fail, I promise.
    }
})();

var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var files =[];
function processNotas(notas) {
    for(var i = 0; i<notas.length ;i++){
        console.log(i + '/' + notas.length); // print status
        createReport(i,notas[i]); // deal with the data
    }
    console.log('merging all pdf files into one');
    merge(files, 'notas.pdf',function(err){
        if(err)
            return console.log(err);
        deleteFolderRecursive('./out');
        console.log('Success');
    });

    // delete working directory
}

function createReport(i,data) {
    var outputFile = './out/' + i.toString() + '.pdf';
    files.push(outputFile);

    var pdfWriter = hummus.createWriterToModify('input.pdf', {modifiedFilePath: outputFile}); // initialize pdf writer
    var font = {font:pdfWriter.getFontForFile('arial.ttf'),size:12,colorspace:'gray',color:0x00}; // initialize font
    var pageModifier = new hummus.PDFPageModifier(pdfWriter,0); // page modifier! the hack begins here!
    var context = pageModifier.startContext().getContext(); // the pdf context data

    // create the page
    createpage(font, context, data.codigoDaDisciplina, data.nomeAluno, data.ra, data.curso, data.tronco, data.nomeDaDisciplina, data.continuada, data.regimental, data.exame, data.turma);

    // finish pdf
    pageModifier.endContext().writePage();
    pdfWriter.end();
}

function createpage(font, context, codigoDaDisciplina, nomeAluno, ra, curso, tronco, nomeDaDisciplina, continuada, regimental, exame, turma) {
    context.writeText( '2018', 275, 735, font);
    context.writeText( '2o', 500, 735, font);
    context.writeText( nomeAluno, 25, 667, font);
    context.writeText( ra, 490, 667, font);
    context.writeText( curso, 25, 635, font);
    context.writeText( tronco, 420, 635, font);
    context.writeText( turma, 490, 635, font);
    context.writeText( codigoDaDisciplina, 25, 600, font);
    context.writeText( nomeDaDisciplina, 200, 600, font);
    context.writeText( continuada, 130, 415, font);
    context.writeText( regimental, 200, 415, font);
    context.writeText( exame, 370, 415, font);
    context.writeText( "X                                       *NÃO ESTOU CADASTRADO NO TRONCO.", 57, 280, font);
    context.writeText( "Alexandre Tolstenko Nogueira", 130, 170, font);
    context.drawImage(380,145,'assinatura.jpg',{transformation:{width:120,height:120, proportional:true}});
    context.writeText( "14   12   18", 46, 150, font);
}

