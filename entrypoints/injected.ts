export default defineUnlistedScript(() => {
  console.log("Hello from injected.ts");
  chrome.action.setTitle({"title": "Enabled"});
  chrome.runtime.onStartup.addListener(() => {
    console.log("Hello")
  })
});