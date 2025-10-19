class devJobsAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }
  render() {

    const size = this.getAttribute('size') ?? '40px';
    const service = this.getAttribute('service') ?? 'github';
    const username = this.getAttribute('username') ?? 'jbortweb';

    const url = this.createUrl(service, username);

    this.shadowRoot.innerHTML = `
    <style>
    img {
      border-radius: 50%;
      width: ${size};
      height: ${size};
      border: 2px solid #00000033;
    }
    </style>
      <img src="${url}" alt="Avatar de ${username}" class="avatar"/>
    `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define('devjobs-avatar', devJobsAvatar);