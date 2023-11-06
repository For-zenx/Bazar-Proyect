const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default eventHandler(async () => {
  await sleep();
});
