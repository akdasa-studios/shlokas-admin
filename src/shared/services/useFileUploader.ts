export function useFileUploader(url: string) {
  async function upload(filename: string, data: Blob) {
    const formData = new FormData()
    formData.append('file', data, filename)

    await fetch(url, {
      method: 'POST',
      body: formData,
    })
  }

  return { upload }
}