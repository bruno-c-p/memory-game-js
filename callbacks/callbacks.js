const fs = require("fs")

fs.readFile("./arq1.txt", (error, resposta) => {
  if (error) {
    console.error("Deu ruim no arq1!", error.stack)
    return
  }

  fs.readFile("./arq2.txt", (error2, resposta2) => {
    if (error2) {
      console.error("Deu ruim no arq2!", error2.stack)
      return
    }

    fs.readFile("./arq3.txt", (error3, resposta3) => {
      if (error3) {
        console.error("Deu ruim no arq3!", error3.stack)
        return
      }

      const conteudo = `${resposta}\n${resposta2}\n${resposta3}`

      fs.writeFile("./final.txt", conteudo, (errorWrite, respostaWrite) => {
        if (errorWrite) {
          console.error("Deu ruim na gravação!", errorWrite)
          return
        }

        console.log("Arquivo salvo com sucesso!")
      })
    })
  })
})
