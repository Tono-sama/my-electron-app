document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').textContent = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').textContent = 'System'
})

document.getElementById('print-log').addEventListener('click', async () => {
  await window.printLog.print()
  console.log('print log from renderer.js')
})

// HTTP request
document.getElementById('http-request-get').addEventListener('click', async () => {
  console.log('http-request-get')
  const result = await window.httpRequest.get()
  console.log(result)
  document.getElementById('http-response').textContent = `status: ${result.status} ${result.statusText}, body: ${result.body}`
})

// DB操作
document.getElementById('postgres-get').addEventListener('click', async () => {
  console.log('postgres-get')
  const result = await window.postgres.get()
  console.log(result)
  document.getElementById('postgres-get-response').textContent = `${result}`
})
document.getElementById('postgres-insert').addEventListener('click', async () => {
  console.log('postgres-insert')
  const result = await window.postgres.insert()
  console.log(result)
  document.getElementById('postgres-insert-response').textContent = `${result}`
})

// ファイル操作
document.getElementById('file-select').addEventListener('click', async () => {
  console.log('file-select')
  const result = await window.file.select()
  console.log(result)
})
document.getElementById('file-save').addEventListener('click', async () => {
  console.log('file-save')
  // const data = getElementById('text-content').value
  const data = document.getElementById('text-content').value
  // document.querySelector('#text').value
  const result = await window.file.save(data)
  console.log(result)
})

const listener = (fileContent) => {
  document.getElementById('file-content').textContent = fileContent;
};
window.fileIO.readFile((_e, fileContent) => listener(fileContent));
