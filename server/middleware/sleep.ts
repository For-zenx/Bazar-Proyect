const sleep = () => new Promise((resolve) => setTimeout(resolve, 2500));

export default eventHandler(async () => {
  await sleep();
});
