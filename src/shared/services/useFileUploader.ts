export function useFileUploader(url: string) {
  async function upload(filename: string, data: any, type: string) {
    const formData = new FormData()
    // formData.append('name', 'verse.svg')
    formData.append('file', new Blob([data], { type }), filename)

    await fetch(url, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    })
  }

  return { upload }
}