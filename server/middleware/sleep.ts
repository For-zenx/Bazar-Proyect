const sleep = () => new Promise((resolve) => setTimeout(resolve, 1500));

export default eventHandler(async () => {
  await sleep();
});
