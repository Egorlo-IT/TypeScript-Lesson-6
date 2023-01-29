export const renderBlock = (elementId: string, html: string) => {
  const element: HTMLElement | null = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
};

export const renderToast = (
  message: { text: string; type: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { name: string; handler: any }
) => {
  let messageText = "";

  if (message.text != "") {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || "Закрыть"}</button>
      </div>
    `;
  }

  renderBlock("toast-block", messageText);

  const button = document.getElementById("toast-main-action");
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast({ text: "", type: "" }, { name: "", handler: null });
    };
  }
};
