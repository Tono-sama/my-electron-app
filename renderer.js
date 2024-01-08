document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})

document.getElementById('print-log').addEventListener('click', async () => {
  await window.printLog.print()
  console.log('print log from renderer.js')
})

document.getElementById('http-request-get').addEventListener('click', async () => {
  console.log('http-request-get')
  const result = await window.httpRequest.get()
  console.log(result)
  document.getElementById('http-response').innerHTML = `status: ${result.status} ${result.statusText}, body: ${result.body}`
})

document.getElementById('postgres-get').addEventListener('click', async () => {
  console.log('postgres-get')
  const result = await window.postgres.get()
  console.log(result)
  document.getElementById('postgres-get-response').innerHTML = `${result}`
})

document.getElementById('postgres-insert').addEventListener('click', async () => {
  console.log('postgres-insert')
  const result = await window.postgres.insert()
  console.log(result)
  document.getElementById('postgres-insert-response').innerHTML = `${result}`
})

// TODO: ファイル操作
// document.getElementById('file-open').addEventListener('click', async () => {
//   console.log('file-open')
//   const result = await window.file.open()
//   console.log(result)
//   document.getElementById('file-open-response').innerHTML = `${result}`
// })
// document.getElementById('file-download').addEventListener('click', async () => {
//   console.log('file-download')
//   const result = await window.file.download()
//   console.log(result)
//   document.getElementById('file-download-response').innerHTML = `${result}`
// })
