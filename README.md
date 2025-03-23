# 🧠 MedicMind 🧠

## ❤️‍🩹 Overview

MedicMind is a React-based application designed to assist users in emergency situations by providing step-by-step first aid instructions. The app leverages voice synthesis to read instructions aloud and voice recognition (voice-to-text) to capture additional emergency details, creating a hands-free, accessible guide during critical moments.

## ⚙️ Features

- **Step-by-Step Emergency Guidance:**  
  Follow a structured first aid guide for various emergencies.
- **Voice Assistance:**  
  Uses speech synthesis to read instructions aloud and (optionally) wait for voice commands to progress through the steps.
- **Voice-to-Text Input:**  
  Capture emergency details (such as location, witness contacts, notes, etc.) using voice-to-text functionality.
- **Emergency Report Generation:**  
  Compile all relevant information into a printable emergency report summarizing the actions taken.
- **911 Call Integration:**  
  Quickly initiate a call to emergency services directly from the app.

## ⌨️ Technology Structure

- **React:**  
  The project is built using React to create a component-based UI, making it easy to manage state and handle dynamic content.

- **TypeScript:**  
  Type safety and enhanced developer productivity are achieved through the use of TypeScript.

- **Vite:**  
  Vite is used as the build tool and development server, providing fast hot-module replacement and efficient bundling.

- **Tailwind CSS:**  
  Styling is handled with Tailwind CSS, enabling a utility-first approach to quickly build a responsive and modern UI.

- **Web Speech API:**  
  The browser’s Web Speech API is integrated for voice synthesis (reading instructions aloud) and voice recognition (converting speech to text).

## 💡 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Daiyan-Zubaier/First-Aid-AI.git
   cd quick-response-guide
