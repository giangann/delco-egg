export function fakeDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("time out run");
      resolve();
    }, seconds * 1000);
  });
}
