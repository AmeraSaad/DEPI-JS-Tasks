const baseUrl = 'https://dummyjson.com';

export default async function handleRemoteRequest(
  endpoint,
  success,
  error,
  startLoading,
  stopLoading
) {
  startLoading();
  try {
    const res = await fetch(`${baseUrl}/${endpoint}`);
    if (res.ok) {
      const data = await res.json();
      console.log("fetch data",data);
      success(data);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    error(e);
  } finally {
    stopLoading();
  }
}
