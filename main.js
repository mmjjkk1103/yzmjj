
class MessageCard extends HTMLElement {
    static get observedAttributes() {
        return ['message'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                background-color: #fff;
                border: 1px solid #dde3ea;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                padding: 20px;
            }

            p {
                margin: 0 0 16px;
                line-height: 1.5;
            }

            button {
                border: 1px solid #006fbd;
                border-radius: 6px;
                background: #007bff;
                color: #fff;
                cursor: pointer;
                font: inherit;
                min-height: 40px;
                padding: 8px 12px;
            }

            button:focus-visible {
                outline: 3px solid rgba(0, 123, 255, 0.3);
                outline-offset: 2px;
            }

            button.copied {
                background: #198754;
                border-color: #157347;
            }
        `;
        this.messageElement = document.createElement('p');
        this.copyButton = document.createElement('button');

        this.copyButton.type = 'button';
        this.copyButton.textContent = 'Copy';
        this.copyButton.addEventListener('click', async () => {
            const copied = await copyText(this.message);
            this.copyButton.textContent = copied ? 'Copied' : 'Copy failed';
            this.copyButton.classList.toggle('copied', copied);

            window.setTimeout(() => {
                this.copyButton.textContent = 'Copy';
                this.copyButton.classList.remove('copied');
            }, 1600);
        });

        shadow.append(style, this.messageElement, this.copyButton);
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    get message() {
        return this.getAttribute('message') || '';
    }

    render() {
        this.messageElement.textContent = this.message;
    }
}

customElements.define('message-card', MessageCard);

async function copyText(text) {
    if (!text) {
        return false;
    }

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.warn('Clipboard API failed, using fallback.', error);
        }
    }

    return fallbackCopyText(text);
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-1000px';
    textArea.style.left = '-1000px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        return document.execCommand('copy');
    } catch (error) {
        console.warn('Fallback copy failed.', error);
        return false;
    } finally {
        document.body.removeChild(textArea);
    }
}

const messages = [
    "You are capable of amazing things.",
    "Your hard work will pay off.",
    "Don't be afraid to take risks.",
    "I'm so proud of the person you are becoming.",
    "Your family is always here for you.",
    "Keep pushing forward, you're doing great!",
    "Your positive attitude is contagious.",
    "You are stronger than you think.",
    "Believe in yourself and all that you are.",
    "Every day is a new opportunity to shine."
];

const messageContainer = document.getElementById('message-container');
const customMessageForm = document.getElementById('custom-message-form');
const customMessageInput = document.getElementById('custom-message');

function addMessageCard(msg) {
    const card = document.createElement('message-card');
    card.setAttribute('message', msg);
    messageContainer.appendChild(card);
}

messages.forEach(addMessageCard);

customMessageForm.addEventListener('submit', event => {
    event.preventDefault();

    const message = customMessageInput.value.trim();
    if (!message) {
        customMessageInput.focus();
        return;
    }

    addMessageCard(message);
    customMessageInput.value = '';
    customMessageInput.focus();
});
