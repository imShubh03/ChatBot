# CDP Support Agent Chatbot

## Overview

The **CDP Support Agent Chatbot** is an AI-powered application designed to answer "how-to" questions related to four Customer Data Platforms (CDPs): **Segment, mParticle, Lytics, and Zeotap**. This chatbot extracts relevant information from the official documentation of these CDPs to guide users on performing tasks or achieving specific outcomes within each platform.

## Screenshots
![image](https://github.com/user-attachments/assets/38651140-d57c-4f74-9749-0281f0e76240)
![image](https://github.com/user-attachments/assets/29a2b824-6f72-42a1-9aa3-66e763bc0de4)

## Features

### Core Functionalities

1. **Answer "How-to" Questions**  
   - Understands and responds to user queries about performing specific tasks or using features within each CDP.  
   - Example questions:  
     - *"How do I set up a new source in Segment?"*  
     - *"How can I create a user profile in mParticle?"*  
     - *"How do I build an audience segment in Lytics?"*  
     - *"How can I integrate my data with Zeotap?"*  

2. **Extract Information from Documentation**  
   - Retrieves relevant data from the official documentation of each CDP.  
   - Navigates through documentation, identifies relevant sections, and extracts necessary instructions or steps.  

3. **Handle Variations in Questions**  
   - Handles different question lengths, ensuring long questions don’t break the chatbot.  
   - Filters out irrelevant queries, such as *"Which movie is getting released this week?"*  

### Bonus Features

4. **Cross-CDP Comparisons**  
   - Answers questions about differences in functionalities between the four CDPs.  
   - Example: *"How does Segment's audience creation process compare to Lytics'?"*  

5. **Advanced "How-to" Questions**  
   - Provides guidance on complex configurations, integrations, and use cases specific to each platform.  

## Data Sources

The chatbot extracts information from the following CDP documentation:

- **Segment**: [https://segment.com/docs/?ref=nav](https://segment.com/docs/?ref=nav)  
- **mParticle**: [https://docs.mparticle.com/](https://docs.mparticle.com/)  
- **Lytics**: [https://docs.lytics.com/](https://docs.lytics.com/)  
- **Zeotap**: [https://docs.zeotap.com/home/en-us/](https://docs.zeotap.com/home/en-us/)  

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS  
- **Backend**: Next.js API routes  
- **Natural Language Processing**: Google's Gemini API  
- **Vector Database**: Supabase with pgvector  
- **Document Processing**: LangChain  
- **Deployment**: Vercel (recommended)  

---

## Installation & Setup

Follow these steps to set up the **CDP Support Agent Chatbot** on your local system.

### **Prerequisites**
Before starting, ensure you have the following installed:

- **Node.js** (version 18+)
- **npm** or **yarn**
- **Vercel CLI** (for deployment)
- **A Supabase account** for the vector database
- **Google Gemini API key** for NLP processing

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/cdp-support-agent-chatbot.git
cd cdp-support-agent-chatbot
```

# 2 Install Dependencies
```
npm install
```

# 3 Set Up Environment Variables
Create a .env.local file in the root directory and add the following keys:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```

### Note : Replace your_google_gemini_api_key, your_supabase_url, and your_supabase_key with actual values from your Google Gemini API and Supabase account.


4. Run the Application Locally
```
npm run dev
```

## The application will start and be accessible at http://localhost:3000.


