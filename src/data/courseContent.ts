// Loaded only when a course page opens, so it does not slow down the rest of the site.

export interface CourseSection {
  title: string;
  lectures: [title: string, minutes: number][];
}

export interface CourseContent {
  subtitle: string;
  learn: string[];
  sections: CourseSection[];
  requirements: string[];
  audience: string[];
  description: string[];
  includes?: string[];
  level?: string;
  language?: string;
}

export const CONTENT: Record<string, CourseContent> = {
  "claude-7": {
    "subtitle": "Go from your first Claude conversation to building a real website and a working app in 7 days, one practical skill at a time. No coding experience needed.",
    "learn": [
      "Write prompts that get specific, useful answers using the simple Context, Role, Goal method",
      "Improve answers through follow-up messages, and respond well when Claude asks you a question back",
      "Fix your own writing: find exactly what's wrong, change the tone for a different audience, keep long documents consistent, and write sensitive messages with care",
      "Choose the right mode for each task: plain Chat, Extended Thinking or Web Search, and check sources before trusting a research answer",
      "Analyse real decisions using proven frameworks like SWOT and cost-benefit analysis, and combine them into one clear recommendation",
      "Hand off complete tasks to Claude Cowork safely: decide what to delegate, write a clear task brief, check the first result, and schedule recurring work",
      "Install Claude Code and build a real website just by describing it in plain English",
      "Build a working ticket booking app with search, filters, bookings and dark mode, then improve it using an honest AI design review"
    ],
    "sections": [
      {
        "title": "Day 1: Meeting Claude",
        "lectures": [
          ["Getting set up: create a free account, send your first message, choose a model", 8],
          ["Context, Role, Goal: the one habit that turns generic answers into useful ones", 8],
          ["Follow-ups: refine any answer without repeating yourself", 8],
          ["Clarifying questions: what to do when Claude asks you something back", 8],
          ["Claude vs ChatGPT vs Gemini: an honest comparison", 7],
          ["4 practice tasks + quiz", 11]
        ]
      },
      {
        "title": "Day 2: Writing & Editing with Claude",
        "lectures": [
          ["Diagnose before you fix: get Claude to name specific problems in your draft", 10],
          ["Change the tone for a different audience without changing the facts", 10],
          ["Check long documents for consistent tone and wording", 10],
          ["Write sensitive messages (price increases, difficult feedback) with the right balance", 10],
          ["4 practice tasks + quiz", 15]
        ]
      },
      {
        "title": "Day 3: The Right Tool at the Right Step",
        "lectures": [
          ["Plain Chat for quick everyday questions", 8],
          ["Extended Thinking for complex problems like scheduling with multiple conditions", 8],
          ["Web Search for current information, with sources you can verify", 8],
          ["3 checks before trusting any research answer", 8],
          ["Quick question vs detailed brief: knowing which one you're writing", 7],
          ["3 practice tasks + quiz", 11]
        ]
      },
      {
        "title": "Day 4: Enhancing Claude's Analysis",
        "lectures": [
          ["Choose the right analytical framework for your decision", 9],
          ["Apply SWOT analysis properly", 9],
          ["Combine two frameworks, such as SWOT with cost-benefit analysis", 9],
          ["Turn your analysis into one final recommendation with the biggest risk named", 9],
          ["3 practice tasks + quiz", 14]
        ]
      },
      {
        "title": "Day 5: Hand Off the Whole Task",
        "lectures": [
          ["What Cowork can do: 40 real tasks you can automate", 7],
          ["The 3-tier system for deciding what to delegate and what to keep", 7],
          ["Write a clear task brief with boundaries", 7],
          ["Live demo: Cowork researches content and saves a report to your computer", 10],
          ["Review the first run before trusting it", 7],
          ["Schedule recurring tasks daily or weekly", 7],
          ["4 practice tasks + quiz + video demos", 10]
        ]
      },
      {
        "title": "Day 6: From Idea to a Real Website",
        "lectures": [
          ["Install Claude Code step by step (Windows and Mac)", 8],
          ["Describe your page and get a working first version", 8],
          ["Make small, targeted edits and add new pages", 7],
          ["Install design skills for better fonts and layouts", 7],
          ["Use reference websites and screenshots to guide the design", 7],
          ["Open and check your finished site in a browser", 7],
          ["4 practice tasks + quiz + video demos", 11]
        ]
      },
      {
        "title": "Day 7: Functional Apps",
        "lectures": [
          ["Plan Mode: review the app structure before Claude builds it", 10],
          ["Build a ticket booking app with event listings, search, category filters, bookings and saved data", 9],
          ["Add new features: edit bookings, dark mode, show only active bookings", 9],
          ["Get an honest design review from Claude", 9],
          ["Fix every issue the review found", 9],
          ["4 practice tasks + quiz + video demo", 14]
        ]
      },
      {
        "title": "Challenge Complete: Your Recap",
        "lectures": [
          ["The 7-word summary: Frame, Revise, Choose, Analyse, Delegate, Build, Extend", 6],
          ["A quick-reference guide to every method you learned", 6],
          ["Everything you built this week", 6],
          ["The one habit to carry forward", 6],
          ["Final quiz", 6]
        ]
      }
    ],
    "requirements": [
      "No coding or AI experience needed",
      "A laptop or desktop computer (Windows or Mac)",
      "A free Claude account is enough for Days 1–4",
      "A paid Claude plan (Pro or higher) is needed for Day 5 (Cowork) and Days 6–7 (Claude Code)",
      "Claude desktop app (free download) for Cowork",
      "Google Chrome for the Cowork browser task",
      "Node.js (free). Installation is covered in Day 6"
    ],
    "audience": [
      "Complete beginners who have never used Claude seriously and want a fast, practical start",
      "Students who want to write, research and prepare for exams more effectively with AI",
      "Small business owners who want to save time on emails, analysis, content and routine tasks",
      "Working professionals who want to automate repetitive work and stand out with practical AI skills",
      "Content creators, trainers and anyone who wants to build a website or app without learning to code"
    ],
    "description": [
      "You've learned how to ask AI questions. Now learn how to put AI to work.",
      "Claude can be much more than a place to type a prompt. The 7-Day Claude AI Challenge is a structured, hands-on journey that takes you from better conversations to research, analysis, decision-making, task delegation, automation, website creation and app development.",
      "You learn alongside three people through the whole challenge: Ritika, a university student new to AI; Karan, who runs a small business; and Takshika, who designs training content.",
      "Every day follows the same simple pattern: see the steps, see a real example, then practise it yourself straight away. You don't read about four things and practise once at the end. You do each skill as you learn it.",
      "What you'll be able to do after 7 days:",
      "• WRITE more effectively",
      "• RESEARCH with greater depth",
      "• ANALYSE complex information",
      "• THINK through decisions",
      "• DELEGATE complete tasks",
      "• AUTOMATE repeatable work",
      "• BUILD websites and functional apps",
      "Why this challenge?",
      "Basic AI prompting is becoming common. What sets you apart is what you can do beyond the prompt. Can you use AI to research? Structure an analysis? Delegate an entire task? Build a webpage? Turn an idea into a working app?",
      "This challenge takes you step by step from everyday AI use to real-world workflows. By the end, you won't just know what Claude can do. You'll know how to put Claude to work on your own tasks.",
      "Chat → Think → Research → Analyse → Delegate → Automate → Build",
      "7 days. From AI conversation to AI capability."
    ],
    "includes": [
      "7 challenge days + 1 recap module (30–60 minutes a day)",
      "26 hands-on practice tasks you complete in Claude as you learn",
      "Ready-to-use example prompts for every skill",
      "40 ready-made Cowork automation prompts for email summaries, news briefings, competitor tracking, social media content, KPI reports and more",
      "Step-by-step video demos for Cowork, website building and app building",
      "Quizzes and interactive exercises after every skill",
      "2 real builds: a working website and a functional ticket booking app",
      "Certificate of completion",
      "Watch lessons on mobile or desktop (Days 5–7 practice needs a computer)"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "mastery-14": {
    "subtitle": "Learn 13 powerful AI tools in 14 days, one tool a day, with hands-on practice after every feature. Research, write, create images, videos, music and avatars, build apps and automate your work.",
    "learn": [
      "Use 13 leading AI tools in real depth: ChatGPT, Perplexity, NotebookLM, Claude, Gemini, DeepSeek, Gamma, Midjourney, Runway, Suno, HeyGen, Lovable and n8n",
      "Follow one simple 4-step method that works on every AI tool, now and in future: Clarify, Specify, Generate, Verify & Refine",
      "Research faster with cited sources, and turn your own documents into quizzes, flashcards, reports, mind maps and slide decks",
      "Use deep research, reasoning modes, file and data analysis, and voice conversations to get better answers",
      "Create professional presentations, product images, short promotional videos and original music",
      "Make AI avatar videos from a script and translate videos into Hindi and 175+ other languages",
      "Build and publish a working web app without coding",
      "Automate tasks with AI agents that make decisions, use tools and remember conversations",
      "Combine several tools into one connected project, from research to a live page with automated follow-ups"
    ],
    "sections": [
      {
        "title": "Day 1: ChatGPT — Master Your AI Assistant",
        "lectures": [
          ["Chat: write specific prompts that get usable answers", 9],
          ["Custom GPTs: find and use ready-made assistants", 8],
          ["Web Search: get current information with sources", 8],
          ["Deep Research: detailed reports for real decisions", 8],
          ["Data Analysis: upload a spreadsheet and get charts, no formulas needed", 8],
          ["Image Generation: create social media banners and visuals", 8],
          ["Voice Mode: practise interviews out loud", 8],
          ["7 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 2: Perplexity — AI-Powered Research",
        "lectures": [
          ["Basic Search with clickable citations", 9],
          ["Focus Modes: academic papers, news, YouTube, Reddit and more", 9],
          ["Pro Search for detailed multi-part comparisons", 8],
          ["Spaces: organise ongoing research projects", 8],
          ["File Upload: check your own document against current web data", 8],
          ["5 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 3: NotebookLM — Research from Your Own Documents",
        "lectures": [
          ["Upload sources and chat with answers linked to exact passages", 8],
          ["Quiz and Flashcards for exam prep", 8],
          ["Mind Map to see how ideas connect", 8],
          ["Reports: briefing docs, study guides, FAQs, timelines", 8],
          ["Data Table exported to Google Sheets", 8],
          ["Infographic in your own brand style", 8],
          ["Slide Deck exported to PowerPoint", 8],
          ["Audio Overview (podcast-style) and Video Overview", 8],
          ["9 practice tasks + quiz", 11]
        ]
      },
      {
        "title": "Day 4: Claude — Careful Writing & Reasoning",
        "lectures": [
          ["Chat with clear roles and boundaries", 9],
          ["Projects: save instructions and files so you never repeat yourself", 9],
          ["Extended Thinking for complex problems", 9],
          ["Web Search with sources", 9],
          ["File Analysis: understand contracts and documents in plain language", 8],
          ["Artifacts: build small working tools like a calculator", 8],
          ["6 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 5: Gemini — Google's AI Assistant",
        "lectures": [
          ["Chat for exam and viva preparation", 9],
          ["Gems: build your own reusable assistant", 9],
          ["Deep Research for detailed comparisons", 9],
          ["Canvas: create quizzes, documents and simple apps", 9],
          ["Image Generation and image editing", 8],
          ["Gemini Live: spoken conversations, with camera and screen sharing", 8],
          ["6 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 6: DeepSeek — Free Reasoning & Coding",
        "lectures": [
          ["Instant Mode for quick questions", 9],
          ["Expert Mode with DeepThink for step-by-step reasoning", 9],
          ["Web Search for current prices and facts", 9],
          ["Vision Mode: solve handwritten problems from a photo", 9],
          ["File Upload: analyse expenses and spreadsheets", 8],
          ["Coding: find bugs and understand code", 8],
          ["6 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 7: Gamma — AI Presentations",
        "lectures": [
          ["Create a full presentation from a prompt in under a minute", 8],
          ["Edit individual slides with AI", 8],
          ["Apply themes or your own brand colours and logo", 8],
          ["Gamma Agent: change the whole deck with one instruction", 8],
          ["Create a landing page website", 8],
          ["Analytics: see which slides your audience viewed most", 8],
          ["6 practice tasks + quiz", 12]
        ]
      },
      {
        "title": "Day 8: Midjourney — AI Image Generation",
        "lectures": [
          ["Write image prompts that produce professional results", 7],
          ["Draft Mode: explore many ideas cheaply", 7],
          ["Personalization: train it to your taste", 7],
          ["Variations: refine an image you like", 7],
          ["Image Prompts: keep your real product consistent", 7],
          ["Fix common image problems", 7],
          ["Commercial use rights explained", 7],
          ["6 practice tasks + quiz", 11]
        ]
      },
      {
        "title": "Day 9: Runway — AI Video Generation",
        "lectures": [
          ["Text-to-Video for promotional clips", 8],
          ["Image-to-Video: animate your product photos", 8],
          ["Motion Brush: animate just one part of an image", 8],
          ["Camera Controls: pan, zoom and tilt like a director", 8],
          ["Character Consistency across multiple scenes", 8],
          ["Video-to-Video: give your phone footage a cinematic look", 8],
          ["6 practice tasks + quiz", 12]
        ]
      },
      {
        "title": "Day 10: Suno — AI Music",
        "lectures": [
          ["Create songs and jingles with your own lyrics and style", 8],
          ["Personas: keep a consistent brand sound", 8],
          ["Voices: hear a song in your own voice", 8],
          ["Instrumental Mode and Stems for further editing", 8],
          ["Hum-to-Song: turn your hummed tune into a full song", 8],
          ["Suno Studio: loops, mashups and alternate sections", 8],
          ["6 practice tasks + quiz", 12]
        ]
      },
      {
        "title": "Day 11: HeyGen — AI Avatars",
        "lectures": [
          ["Create your own digital avatar from a short video or one photo", 8],
          ["Turn a script into a presenter video", 8],
          ["Translate videos into 175+ languages with matched lip movements", 8],
          ["Interactive Avatar that answers questions live", 8],
          ["Stock avatars and brand styling if you don't want to use your own face", 8],
          ["Credit costs and consent explained", 8],
          ["5 practice tasks + quiz", 12]
        ]
      },
      {
        "title": "Day 12: Lovable — Build Apps Without Coding",
        "lectures": [
          ["Build a working app from a description (e.g. a booking tool)", 9],
          ["Make precise edits to style, sections, layout and text", 9],
          ["Import a Figma design or screenshot", 9],
          ["Connect real tools like Stripe for payments", 9],
          ["Publish your app live", 8],
          ["Add a custom domain, including a free route", 8],
          ["5 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 13: n8n — AI Automation",
        "lectures": [
          ["Build your first automated workflow", 9],
          ["AI Agent node that makes real decisions", 9],
          ["Tools: let the agent check Google Sheets, Slack and more", 9],
          ["MCP Client: connect many tools at once", 9],
          ["Memory: agents that remember the conversation", 8],
          ["When to use a simple Chain instead of a full Agent", 8],
          ["6 practice tasks + quiz", 13]
        ]
      },
      {
        "title": "Day 14: Bringing It All Together",
        "lectures": [
          ["Research with Perplexity or NotebookLM", 8],
          ["Write messaging with ChatGPT or Claude", 8],
          ["Create visuals with Midjourney", 8],
          ["Build a pitch deck with Gamma", 8],
          ["Launch a landing page with Lovable", 8],
          ["Automate sign-up follow-ups with n8n", 8],
          ["7 practice checkpoints + quiz", 12]
        ]
      },
      {
        "title": "Challenge Complete: Your Recap",
        "lectures": [
          ["The 14-word summary, one word per day", 10],
          ["Quick guide: which tool to use for which task", 10],
          ["Everything you built during the challenge", 10],
          ["Final quiz", 10]
        ]
      }
    ],
    "requirements": [
      "No AI or coding experience needed",
      "A laptop or desktop computer with internet",
      "A Google account (most tools let you sign in with it)",
      "Most tools have a free plan that covers the practice tasks",
      "Midjourney has no free plan (paid plans start at about US$10/month)",
      "Some advanced features in Runway, HeyGen, Lovable and Gamma need a paid plan or free trial credits",
      "Without a paid plan, you can still learn every step and prepare your prompts for later"
    ],
    "audience": [
      "Beginners who want a practical tour of today's most useful AI tools",
      "Students who want better research, study aids, presentations and interview practice",
      "Small business owners who want marketing images, videos, a booking app and automated customer replies",
      "Working professionals, trainers and content creators who want to produce more, faster",
      "Anyone who wants to know which AI tool to use for which job"
    ],
    "description": [
      "AI isn't waiting. Are your skills keeping up?",
      "AI is changing how quickly people research, write, analyse, create, build and automate. The advantage isn't knowing that these tools exist. It's knowing how to put them to work.",
      "You learn alongside three people throughout the challenge: Ritika, a final-year student job-hunting and finishing coursework; Karan, who runs a small business; and Takshika, who designs training programs.",
      "The 14-Day AI Mastery Challenge gives you a structured, hands-on introduction to 13 powerful AI platforms, with a different tool each day. For every feature, you see the exact steps, see a real example, then practise it yourself straight away.",
      "13 AI platforms. One practical learning journey.",
      "• ChatGPT: thinking, writing, ideas, everyday AI help",
      "• Perplexity: search, research, source-backed answers",
      "• NotebookLM: documents, knowledge, research from your own files",
      "• Claude: reasoning, analysis, writing, structured work",
      "• Gemini: research, creation, Google's AI",
      "• DeepSeek: reasoning, analysis, problem solving, coding",
      "• Gamma: presentations, documents, visual storytelling",
      "• Midjourney: AI images, visual concepts, creative direction",
      "• Runway: AI video, motion, visual storytelling",
      "• Suno: music, songs, creative audio",
      "• HeyGen: AI avatars, talking videos, digital presenters",
      "• Lovable: websites, apps, prototypes",
      "• n8n: automation, connected workflows, AI-powered processes",
      "Research → Think → Create → Present → Build → Automate",
      "This isn't about collecting AI tools. It's about learning what you can do with them:",
      "• RESEARCH information faster",
      "• WRITE and communicate more effectively",
      "• ANALYSE ideas and information",
      "• CREATE professional images",
      "• PRODUCE AI-powered videos",
      "• GENERATE music and audio",
      "• BUILD presentations",
      "• CREATE AI avatars",
      "• BUILD websites and apps",
      "• AUTOMATE repeatable workflows",
      "Tools will keep changing. That's why the whole challenge is built on one 4-step method, Clarify, Specify, Generate, Verify & Refine, that you can apply to any new AI tool you meet in future.",
      "14 days. 13 AI tools. One goal: become AI-ready.",
      "Don't wait until AI skills become an expectation. Start building them now."
    ],
    "includes": [
      "14 challenge days + 1 recap module (about 60 minutes a day)",
      "13 AI tools covered in depth, with 80+ features explained step by step",
      "86 hands-on practice tasks you complete in the real tools as you learn",
      "Click-by-click instructions for every feature",
      "Ready-to-use example prompts for every feature",
      "Quizzes and interactive exercises every day",
      "A final capstone project combining 6 tools",
      "Honest notes on free vs paid plans, credit limits and responsible use",
      "Certificate of completion",
      "Watch lessons on mobile or desktop (practice works best on a computer)"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "mastery-28": {
    "subtitle": "Learn 28 practical AI tools in 28 days, one tool a day, across writing, design, video, marketing, sales, meetings, coding and productivity. Then combine 7 of them into one complete business launch project.",
    "learn": [
      "Use 28 AI tools for real work, from ChatGPT and DeepSeek to HubSpot, Canva, Synthesia, ClickUp and GitHub Copilot",
      "Follow one simple 4-step method that works on any AI tool: Clarify, Specify, Generate, Verify & Refine",
      "Create marketing content, product descriptions, SEO articles and social posts in your own brand voice",
      "Design graphics, product photos and presentations, and remove or replace photo backgrounds",
      "Produce training videos, AI avatar presenters and short social clips, and add subtitles in many languages",
      "Polish your writing with grammar, tone and paraphrasing tools, and use AI responsibly for academic work",
      "Set up AI for sales and customer support: CRM agents, chatbots for WhatsApp and Instagram, and lead follow-up",
      "Capture meeting notes and action items automatically, and get clear call audio from anywhere",
      "Use AI to write, review and secure code, even as a beginner",
      "Choose the right tool for each job, including when a tool is too expensive or not the right fit"
    ],
    "sections": [
      {
        "title": "Day 1: DeepSeek — Reasoning",
        "lectures": [
          ["Instant Mode for quick answers", 10],
          ["DeepThink for step-by-step reasoning on hard problems", 10],
          ["Web Search for current prices and facts", 10],
          ["Solve handwritten problems from a photo", 10],
          ["Analyse spreadsheets and documents", 10],
          ["Find and fix bugs in code", 10]
        ]
      },
      {
        "title": "Day 2: ChatGPT — Full Capabilities",
        "lectures": [
          ["Interview preparation with specific prompts", 12],
          ["Ready-made Custom GPTs", 12],
          ["Web Search and Deep Research for decisions", 12],
          ["Data analysis with charts, no formulas needed", 12],
          ["Image generation for social media banners", 11],
          ["Voice Mode for mock interviews", 11]
        ]
      },
      {
        "title": "Day 3: HubSpot Breeze AI — CRM & Marketing",
        "lectures": [
          ["Breeze Assistant (free): summarise deal history before a call", 12],
          ["Content Agent: landing pages in your brand voice", 12],
          ["Customer Agent: a 24/7 support chatbot", 12],
          ["Prospecting Agent: personalised outreach based on lead activity", 12],
          ["Social Media Agent: weekly post ideas", 12]
        ]
      },
      {
        "title": "Day 4: Canva AI — Design",
        "lectures": [
          ["Magic Design: a full design from one sentence", 12],
          ["Magic Write: copy for your designs", 12],
          ["Text to Image for illustrations", 12],
          ["Background Remover and Magic Expand", 12],
          ["Magic Charts: turn data into designed charts", 12]
        ]
      },
      {
        "title": "Day 5: Crystal Knows — Personality Insights for Sales",
        "lectures": [
          ["Personality (DISC) profiles from LinkedIn before a call", 11],
          ["Communication tips for each person", 11],
          ["Live tips during video meetings", 11],
          ["Tailored interview questions for hiring", 11],
          ["Using personality insights ethically", 11]
        ]
      },
      {
        "title": "Day 6: Gamma — AI Presentations",
        "lectures": [
          ["A full pitch deck from a prompt in under a minute", 12],
          ["Edit slides with AI, apply your brand theme", 12],
          ["Change the whole deck with one instruction", 12],
          ["Create a landing page website", 12],
          ["See which slides your audience viewed most", 12]
        ]
      },
      {
        "title": "Day 7: Copy.ai — Marketing Copy & Automation",
        "lectures": [
          ["Product descriptions, emails and ads from 90+ templates", 11],
          ["Brand Voice trained on your past content", 11],
          ["Workflows: research a lead and draft a personalised email automatically", 11],
          ["Infobase: keep pricing and policies accurate", 11],
          ["What it can't do well (SEO-specific content)", 11]
        ]
      },
      {
        "title": "Day 8: Lumen5 — Blog to Video",
        "lectures": [
          ["Turn a blog post into a video automatically", 11],
          ["AI voiceover without recording", 11],
          ["Brand Kit for consistent branding", 11],
          ["Royalty-free stock footage and music", 11],
          ["Export for YouTube, Instagram, LinkedIn", 11]
        ]
      },
      {
        "title": "Day 9: Midjourney — AI Images",
        "lectures": [
          ["Professional product photos from a prompt", 15],
          ["Draft Mode to explore logo ideas cheaply", 15],
          ["Personalization, Variations and reference images", 15],
          ["Fix common image problems", 15]
        ]
      },
      {
        "title": "Day 10: D-ID — Talking Avatars",
        "lectures": [
          ["Turn one photo into a talking presenter video", 11],
          ["Clone your own voice", 11],
          ["Live interactive avatar agents for your website", 11],
          ["AI-generated presenter faces", 11],
          ["Add avatars inside PowerPoint and Canva", 11]
        ]
      },
      {
        "title": "Day 11: Pictory — Script & Webinar to Video",
        "lectures": [
          ["Turn a script into a video with captions", 11],
          ["Turn a 60-minute webinar into a 60-second highlight", 11],
          ["Split one recording into 10+ social clips", 11],
          ["Turn a PowerPoint into a narrated video", 11],
          ["Review AI-matched visuals before publishing", 11]
        ]
      },
      {
        "title": "Day 12: QuillBot — Editing & Academic Writing",
        "lectures": [
          ["Paraphraser in 7 modes, including Academic", 11],
          ["Grammar Checker for cover letters and emails", 11],
          ["Summariser for long articles", 11],
          ["Citation Generator (APA, MLA, Chicago)", 11],
          ["AI Detector and Humanizer, used honestly", 11]
        ]
      },
      {
        "title": "Day 13: Speechify — Text to Speech",
        "lectures": [
          ["Listen to any document or article", 11],
          ["Scan a printed book page and hear it read aloud", 11],
          ["Clone your own voice for study notes", 11],
          ["Dub videos into Hindi and 60+ languages", 11],
          ["Study faster with adjustable reading speed", 11]
        ]
      },
      {
        "title": "Day 14: GitHub — AI Code Review & Security",
        "lectures": [
          ["Automatic AI review of code changes", 14],
          ["AI fixes for security vulnerabilities", 14],
          ["Custom review instructions for your project", 14],
          ["Staying safe with AI-generated code", 13]
        ]
      },
      {
        "title": "Day 15: GitHub Copilot — AI Coding",
        "lectures": [
          ["Code suggestions as you type", 12],
          ["Ask Mode to understand unfamiliar code", 12],
          ["Edit Mode for specific changes", 12],
          ["Agent Mode to complete whole tasks", 12],
          ["Copilot in the terminal, and safe approval settings", 12]
        ]
      },
      {
        "title": "Day 16: Rytr — Fast Short-Form Writing",
        "lectures": [
          ["40+ templates for descriptions, emails and posts", 13],
          ["20+ tones and your own brand voice", 13],
          ["AIDA and PAS copywriting frameworks", 12],
          ["When to choose a bigger tool instead", 12]
        ]
      },
      {
        "title": "Day 17: Pixlr — AI Photo Editing",
        "lectures": [
          ["Remove backgrounds from product photos", 10],
          ["Fix edges the AI missed", 10],
          ["Process a whole product catalogue at once", 10],
          ["Generate new backgrounds from a text prompt", 10],
          ["Save in the right format (PNG vs JPEG)", 10]
        ]
      },
      {
        "title": "Day 18: Grammarly — Writing Assistant Everywhere",
        "lectures": [
          ["Real-time corrections in Gmail, Slack, Docs and LinkedIn", 13],
          ["Tone Detector before you hit send", 13],
          ["GrammarlyGO for replies and summaries", 12],
          ["Authorship: show honestly what you wrote vs AI", 12]
        ]
      },
      {
        "title": "Day 19: Wordtune — Sentence-Level Rewriting",
        "lectures": [
          ["Rewrite awkward sentences", 10],
          ["Change tone and length", 10],
          ["Add sourced facts and examples", 10],
          ["Summarise documents up to 500 pages with citations", 10],
          ["Smart Paste: reformat text for a new context", 10]
        ]
      },
      {
        "title": "Day 20: Writesonic — SEO Content",
        "lectures": [
          ["Web-connected research with Chatsonic", 14],
          ["SEO-optimised articles with Article Writer", 14],
          ["See what people ask AI assistants, not just Google", 14],
          ["Brand Voice for consistent articles", 13]
        ]
      },
      {
        "title": "Day 21: Chatfuel — Chatbots for WhatsApp & Instagram",
        "lectures": [
          ["Build a booking chatbot without code", 11],
          ["Handle off-script questions with AI", 11],
          ["One inbox for WhatsApp, Instagram, Messenger and website chat", 11],
          ["Train the bot on your products and FAQs", 11],
          ["Shopify abandoned cart recovery", 11]
        ]
      },
      {
        "title": "Day 22: Google AI — Search & Gmail",
        "lectures": [
          ["AI Overviews in Google Search", 11],
          ["Summarise long email threads in Gmail (free)", 11],
          ["Find old emails by asking a question", 11],
          ["Help Me Write for email drafts", 11],
          ["Privacy settings to control Gmail AI", 11]
        ]
      },
      {
        "title": "Day 23: ClickUp Brain — AI Project Management",
        "lectures": [
          ["Ask questions about your tasks and projects", 11],
          ["Autopilot Agents for routine handoffs", 11],
          ["Super Agents for multi-step work", 11],
          ["AI Notetaker for meetings", 11],
          ["Pricing to check before you subscribe", 11]
        ]
      },
      {
        "title": "Day 24: Synthesia — Training Videos",
        "lectures": [
          ["Screen recordings narrated by an AI presenter", 15],
          ["Turn PowerPoint speaker notes into video", 15],
          ["Full-body avatars with natural gestures", 15],
          ["Export as SCORM for any LMS, including Moodle", 15]
        ]
      },
      {
        "title": "Day 25: Sembly AI — Meeting Notes",
        "lectures": [
          ["Auto-join and transcribe Zoom, Meet and Teams", 10],
          ["Risks, decisions and action items extracted automatically", 10],
          ["Organise meetings by project", 10],
          ["Send tasks to Notion, Trello, HubSpot or Slack", 10],
          ["Ask questions about past meetings", 10]
        ]
      },
      {
        "title": "Day 26: Krisp — Clear Call Audio",
        "lectures": [
          ["Remove background noise from calls", 13],
          ["Accent Conversion and how it works", 13],
          ["Meeting notes without a bot joining the call", 12],
          ["On-device privacy", 12]
        ]
      },
      {
        "title": "Day 27: Vrew — Edit Video Like a Document",
        "lectures": [
          ["Cut video by deleting text from the transcript", 11],
          ["Auto-subtitles in your brand style", 11],
          ["Remove pauses and \"um\"s in one click", 11],
          ["Fix a spoken mistake without re-recording", 11],
          ["Translate subtitles into many languages", 11]
        ]
      },
      {
        "title": "Day 28: Conversica — AI Sales Assistants",
        "lectures": [
          ["Automatic lead follow-up and qualification", 10],
          ["Re-engage cold leads", 10],
          ["Email, SMS and chat outreach", 10],
          ["Use in marketing, sales and customer success", 10],
          ["Judging whether an enterprise tool fits your business size", 10]
        ]
      },
      {
        "title": "Day 29: Capstone — Launch a New Service Line",
        "lectures": [
          ["Research the idea with DeepSeek", 8],
          ["Set up a lead pipeline in HubSpot", 8],
          ["Create branding in Canva", 8],
          ["Write website copy with Writesonic", 8],
          ["Build a pitch deck in Gamma", 8],
          ["Plan the launch in ClickUp", 7],
          ["Set up a customer chatbot in Chatfuel", 7],
          ["8 practice checkpoints, including your own 3-stage mini project", 11]
        ]
      },
      {
        "title": "Challenge Complete: Your Recap",
        "lectures": [
          ["The 28-word summary, one word per day", 15],
          ["Quick guide: which tool to use for which task", 15],
          ["Final quiz", 15]
        ]
      }
    ],
    "requirements": [
      "No AI or coding experience needed",
      "A laptop or desktop computer with internet",
      "A Google account (most tools let you sign in with it)",
      "Most tools have a free plan or free trial that covers the core practice",
      "Some features need paid plans: Midjourney (no free plan), Writesonic, Canva Pro, HubSpot Professional agents, Synthesia, and advanced GitHub, ClickUp and Copy.ai features",
      "Conversica is an enterprise tool (from about US$2,999/month), so that day is taught through examples rather than hands-on use",
      "Where a tool needs a paid plan, the course gives you an alternative task, so you can complete every day without buying any tool"
    ],
    "audience": [
      "Small business owners who want AI for marketing, sales, customer support and operations",
      "Marketing, sales and HR professionals who want practical, job-ready AI skills",
      "Trainers, educators and content creators who want to produce videos, presentations and courses faster",
      "Students who want better writing, research and study tools, used honestly",
      "Anyone who wants a broad, structured tour of AI tools instead of random tutorials"
    ],
    "description": [
      "Stop watching random AI tutorials. Start building a structured AI skillset.",
      "Every week brings another AI tool, another feature and another promise to transform the way we work. You don't need to chase everything. You need a structured place to start.",
      "You learn alongside three people throughout the challenge: Ritika, a university student; Karan, who runs a small home-repair business; and Takshika, who designs training programs.",
      "The 28-Day AI Mastery Challenge gives you a focused, hands-on learning journey across:",
      "• AI ASSISTANTS — ChatGPT · DeepSeek · Google AI (Search & Gmail)",
      "• MARKETING & SALES — HubSpot Breeze · Crystal Knows · Copy.ai · Writesonic · Rytr · Chatfuel · Conversica",
      "• DESIGN & VISUALS — Midjourney · Canva AI · Pixlr",
      "• VIDEO & PRESENTATIONS — Gamma · Synthesia · D-ID · Pictory · Lumen5 · Vrew",
      "• WRITING & VOICE — Grammarly · QuillBot · Wordtune · Speechify · Krisp",
      "• PRODUCTIVITY — ClickUp Brain · Sembly AI",
      "• CODING — GitHub · GitHub Copilot",
      "For every feature, you see the exact steps, see a real example, then practise it yourself straight away.",
      "\"I know AI\" is becoming the starting point. The question is: what can you actually do with it?",
      "• Can you use AI to research?",
      "• Can you create professional content?",
      "• Can you improve presentations?",
      "• Can you work with images and video?",
      "• Can you support marketing and sales?",
      "• Can you automate repetitive tasks?",
      "• Can you choose the right AI tool for the work in front of you?",
      "This challenge also tells you honestly what each tool can't do, where the hidden costs are, and when a cheaper tool fits better, so you spend your time and money wisely.",
      "Don't just know the names of AI tools. Learn where they fit into real work.",
      "From \"I should learn AI\" to \"I know where to start.\"",
      "28 days · Practical AI · Real use cases"
    ],
    "includes": [
      "28 tool days + 1 capstone project day + 1 recap module (about 1 hour a day)",
      "28 AI tools covered in depth, with 140+ features explained step by step",
      "120+ hands-on practice tasks in the real tools",
      "Click-by-click instructions and ready-to-use example prompts for every feature",
      "Quizzes and interactive exercises every day",
      "A capstone project: launch a new service line using 7 connected tools",
      "Honest notes on free vs paid plans, pricing traps, privacy and responsible use",
      "Certificate of completion",
      "Watch lessons on mobile or desktop (practice works best on a computer)"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "junior": {
    "subtitle": "A 28-day creative journey for children aged 8–12. They learn to use AI to ask better questions, create quizzes, explore science and space, improve school projects, write stories, and build their own working game in Scratch.",
    "learn": [
      "Ask AI clear questions and give clear instructions, which is a skill they'll use for life",
      "Create their own quizzes, riddles, brain teasers and logic puzzles",
      "Explore countries, science, space, animals and history through curiosity-led missions",
      "Get help with school projects: find ideas, understand topics simply and plan presentations",
      "Turn their imagination into characters, scenes and creative descriptions",
      "Make invitations, greetings and activities for festivals and celebrations",
      "Prepare for competitions with brainstorming, speech practice and confidence-building activities",
      "Write stories, plan storyboards and come up with animation ideas",
      "Design and build their own working game in Scratch, from idea to testing and improving it"
    ],
    "sections": [
      {
        "title": "Meet Your AI Creative Buddy",
        "lectures": [
          ["What Claude is and how to talk to it", 24],
          ["Asking better questions", 24],
          ["Giving clear instructions", 24],
          ["Exploring ideas through conversation", 24]
        ]
      },
      {
        "title": "Create Quizzes & Puzzles",
        "lectures": [
          ["Fun quizzes on any topic", 24],
          ["Riddles and brain teasers", 24],
          ["Logic challenges", 24],
          ["Creating your own puzzles for friends and family", 24]
        ]
      },
      {
        "title": "Go on Knowledge Adventures",
        "lectures": [
          ["Countries and cultures", 24],
          ["Science and space", 24],
          ["Animals and nature", 24],
          ["History and fascinating facts", 24]
        ]
      },
      {
        "title": "Make School Projects More Creative",
        "lectures": [
          ["Finding project ideas", 24],
          ["Understanding topics in simple words", 24],
          ["Research support", 24],
          ["Planning presentations", 24]
        ]
      },
      {
        "title": "Turn Imagination into Creative Art",
        "lectures": [
          ["Creating characters and scenes", 24],
          ["Choosing themes", 24],
          ["Writing creative descriptions", 24],
          ["Visual thinking", 24]
        ]
      },
      {
        "title": "Create for Festivals & Celebrations",
        "lectures": [
          ["Invitations and greetings", 24],
          ["Celebration ideas and activities", 24],
          ["Festival projects", 24]
        ]
      },
      {
        "title": "Prepare for Competitions",
        "lectures": [
          ["Brainstorming ideas", 24],
          ["Practising speeches", 24],
          ["Creative challenges", 24],
          ["Building confidence", 24]
        ]
      },
      {
        "title": "Become a Young Story Creator",
        "lectures": [
          ["Writing stories and building characters", 24],
          ["Planning scenes and storyboards", 24],
          ["Video and animation ideas", 24]
        ]
      },
      {
        "title": "Build a Real Game in Scratch",
        "lectures": [
          ["Coming up with a game idea", 24],
          ["Designing characters, rules and actions", 24],
          ["Adding challenges", 24],
          ["Building the game in Scratch", 24],
          ["Testing and improving it", 24]
        ]
      }
    ],
    "requirements": [
      "No coding or AI experience needed",
      "A laptop or desktop computer with internet (recommended for Scratch)",
      "A Claude account, which a parent sets up and supervises",
      "Scratch, which is free at scratch.mit.edu",
      "A parent or guardian available for supervision, especially during the first few missions"
    ],
    "audience": [
      "Children aged 8–12 who are curious about AI, games and creating things",
      "Parents who want their child's screen time to be creative and productive",
      "Children who enjoy quizzes, stories, art or games and want to make their own",
      "Students who want help making school projects and competition entries more creative",
      "Families who prefer learning in English, Hindi or Marathi"
    ],
    "description": [
      "What if your child could create with AI, not just watch it?",
      "Your child will grow up with AI. Let's teach them to create with it.",
      "The TAKXILA Junior AI Challenge turns screen time into creative time. Over 28 days, children aged 8–12 complete one hands-on mission every day. Each mission asks them to try, create and improve something of their own instead of passively watching.",
      "The journey:",
      "• Day 1: Meet your AI creative buddy",
      "• Next: Create quizzes, solve puzzles, explore the world",
      "• Then: Build school projects, imagine characters, write stories",
      "• Finally: Design and build your own game in Scratch",
      "Ask → Think → Explore → Create → Design → Build → Play",
      "Less passive screen time. More creative screen time.",
      "This isn't just \"learning AI.\" It's learning to create with AI, and to think, question and imagine along the way.",
      "Their ideas. Their creativity. Their game."
    ],
    "includes": [
      "28 daily missions, one new creative activity every day",
      "310 interactive screens with activities and challenges, not passive videos",
      "Hands-on practice with Claude AI",
      "A complete Scratch game-building project",
      "Lessons in English, Hindi and Marathi",
      "Certificate of completion"
    ],
    "level": "Ages 8–12",
    "language": "English, Hindi and Marathi"
  },
  "ready": {
    "subtitle": "Learn 27 practical AI tools in 28 days, one tool a day, for research, writing, visuals, video, voice, meetings, marketing, sales and automation. Each lesson tells you clearly what's free and what's paid.",
    "learn": [
      "Write prompts that get useful answers using Role, Context and Instructions",
      "Follow one simple 4-step method that works on any AI tool: Clarify, Specify, Generate, Verify & Refine",
      "Research faster with cited sources using Perplexity, Grok, DeepSeek and Gemini",
      "Analyse long documents, contracts and mixed files, and get one clear summary",
      "Create images, social posts, flyers, product mockups and presentations without design skills",
      "Produce AI avatar videos, script-to-video content and short clips for social media",
      "Turn articles into audio, write by voice, get clear call audio and automatic meeting notes",
      "Use AI inside Outlook, Excel, Word, PowerPoint, Teams, Notion and ClickUp",
      "Write marketing copy, set up AI chatbots for Instagram and WhatsApp, and use AI in your CRM",
      "Automate repeated tasks with Zapier by simply describing them",
      "Know which tools are free, which are paid, and which one fits each job"
    ],
    "sections": [
      {
        "title": "Day 1: ChatGPT — Endless Possibilities",
        "lectures": [
          ["Why vague prompts give vague answers", 11],
          ["Role, Context and Instructions: the 3 parts of a strong prompt", 11],
          ["Follow-ups that reuse the whole conversation", 11],
          ["Custom GPTs, Memory, Projects, Voice Mode, Deep Research and Connectors", 11],
          ["5 practice tasks", 16]
        ]
      },
      {
        "title": "Day 2: Gemini — Make Sense of Mixed Documents",
        "lectures": [
          ["Upload notes, emails, PDFs and spreadsheets together", 13],
          ["Get one connected summary, with contradictions flagged", 13],
          ["The 3-part formula for good Gemini requests", 12],
          ["Gemini's limits and when to double-check", 12]
        ]
      },
      {
        "title": "Day 3: Claude — Careful Thinking & Long Documents",
        "lectures": [
          ["When to choose Claude over ChatGPT or Gemini", 13],
          ["Review a contract section by section and flag risks", 13],
          ["Prepare for a meeting or difficult conversation", 12],
          ["Projects and Artifacts (free) vs Pro features", 12]
        ]
      },
      {
        "title": "Day 4: Midjourney — AI Images",
        "lectures": [
          ["Create your first image from a prompt", 12],
          ["Refine with Vary Subtle, Vary Strong and Upscale", 11],
          ["How lighting words change the whole image", 11],
          ["Keep a consistent look with reference images", 11]
        ]
      },
      {
        "title": "Day 5: Synthesia — AI Avatar Videos",
        "lectures": [
          ["Create a presenter video from a script, no camera", 12],
          ["Write scripts that sound natural", 11],
          ["Translate videos into 160+ languages", 11],
          ["Branding, scenes and export settings", 11]
        ]
      },
      {
        "title": "Day 6: Perplexity — Research with Sources",
        "lectures": [
          ["One researched answer instead of 10 open tabs", 12],
          ["Compare tools or vendors and get a recommendation", 11],
          ["Check citations before you act", 11],
          ["Pro Search, Deep Research and Spaces", 11]
        ]
      },
      {
        "title": "Day 7: Canva AI — Design from a Sentence",
        "lectures": [
          ["Design, Image, Doc, Code and Video modes", 15],
          ["Create posts and flyers by typing, uploading or speaking", 15],
          ["Refine designs with the in-editor chatbot", 15]
        ]
      },
      {
        "title": "Day 8: ChatGPT Images — Visuals for Work",
        "lectures": [
          ["Posters with exact, readable text", 11],
          ["Realistic people and specific art styles", 11],
          ["Labelled diagrams and product mockups", 17],
          ["Edit one thing at a time", 11]
        ]
      },
      {
        "title": "Day 9: Jasper — Marketing Copy in Your Brand Voice",
        "lectures": [
          ["Why general AI tools sound generic for marketing", 12],
          ["The What + Who + Goal brief", 11],
          ["Agent Library templates and Jasper IQ brand memory", 11],
          ["Emails, social posts, ads and website copy", 11]
        ]
      },
      {
        "title": "Day 10: Notion AI — Your AI Project Hub",
        "lectures": [
          ["Build a reusable project management workspace", 19],
          ["Planning, risk, reporting and team update templates", 18],
          ["Ask questions across your whole workspace", 18]
        ]
      },
      {
        "title": "Day 11: Grok — Real-Time Information",
        "lectures": [
          ["What people are saying about a topic today", 12],
          ["DeepSearch for cited, cross-checked research", 11],
          ["Imagine for images and short videos", 11],
          ["Turn rough notes into formatted documents", 11]
        ]
      },
      {
        "title": "Day 12: Microsoft Copilot — AI Inside Office",
        "lectures": [
          ["Summarise long email threads in Outlook", 13],
          ["Meeting recaps in Teams", 13],
          ["Charts and formulas in Excel from plain words", 12],
          ["Turn a Word document into a PowerPoint deck", 12]
        ]
      },
      {
        "title": "Day 13: Fathom — AI Meeting Notes",
        "lectures": [
          ["Auto-join and record Zoom, Meet and Teams calls", 12],
          ["Instant summaries and action items", 11],
          ["Share a short clip instead of the full recording", 11],
          ["Draft follow-up emails from the call", 11]
        ]
      },
      {
        "title": "Day 14: Zapier — Automate Repeated Work",
        "lectures": [
          ["Triggers and actions explained simply", 13],
          ["Build an automation by describing it", 13],
          ["Add AI steps to summarise, sort or draft", 12],
          ["When to use an AI Agent instead", 12]
        ]
      },
      {
        "title": "Day 15: Beautiful.ai — Presentations in Minutes",
        "lectures": [
          ["Turn scattered notes into a designed deck", 12],
          ["Smart Slides that keep layouts clean", 11],
          ["Flowcharts and diagrams from a description", 11],
          ["Where your own judgment must take over", 11]
        ]
      },
      {
        "title": "Day 16: DeepSeek — Reasoning & Search",
        "lectures": [
          ["Instant, Expert and Vision modes", 14],
          ["DeepThink: see the step-by-step reasoning", 13],
          ["Meaning-based search for \"why\" questions", 13]
        ]
      },
      {
        "title": "Day 17: Grammarly — Writing Partner Everywhere",
        "lectures": [
          ["Real-time corrections in Gmail, Docs, Slack and LinkedIn", 14],
          ["Proofreader, Paraphraser, Reader Reactions and Humanizer", 13],
          ["Grammarly Go assistant", 13]
        ]
      },
      {
        "title": "Day 18: QuillBot — Paraphrasing & Grammar",
        "lectures": [
          ["Standard, Fluency and Formal modes", 14],
          ["Grammar Checker, Sentence Rewriter and vocabulary", 13],
          ["Plagiarism Checker, citations and AI Detector", 13]
        ]
      },
      {
        "title": "Day 19: Pixlr — AI Photo Editing",
        "lectures": [
          ["Auto-enhance and AI image generation", 14],
          ["Remove backgrounds and add text in minutes", 13],
          ["Layers, filters and the right export format", 13]
        ]
      },
      {
        "title": "Day 20: Pictory — Script to Video",
        "lectures": [
          ["Turn a script, URL or PowerPoint into a video", 12],
          ["Auto-highlights for social media clips", 11],
          ["Edit video by editing text", 11],
          ["AI voiceovers and brand kit", 11]
        ]
      },
      {
        "title": "Day 21: D-ID — Talking Avatars",
        "lectures": [
          ["Turn a photo into a talking presenter", 12],
          ["Voice cloning in 120+ languages", 11],
          ["Interactive AI agents for your website", 11],
          ["Video Translate", 11]
        ]
      },
      {
        "title": "Day 22: Speechify — Listen, Dictate, Learn",
        "lectures": [
          ["Turn articles and PDFs into audio", 12],
          ["Write by voice up to 5x faster", 11],
          ["Ask questions about the document you're reading", 11],
          ["Turn documents into podcasts", 11]
        ]
      },
      {
        "title": "Day 23: Krisp — Clear Calls & Meeting Notes",
        "lectures": [
          ["Remove background noise during calls", 12],
          ["Accent Conversion and live voice translation", 11],
          ["Meeting notes without a bot in the call", 11],
          ["Ask Krisp to find any moment in a meeting", 11]
        ]
      },
      {
        "title": "Day 24: ClickUp Brain 2.0 — AI Project Management",
        "lectures": [
          ["Create tasks with one plain sentence", 13],
          ["Switch between ChatGPT, Claude and Gemini in one chat", 13],
          ["Super Agents for always-on workflows", 12],
          ["Build automations in plain English", 12]
        ]
      },
      {
        "title": "Day 25: HubSpot Breeze — AI in Your CRM",
        "lectures": [
          ["Ask questions about your deals and contacts", 12],
          ["Customer, Prospecting and Data Agents", 11],
          ["Content Remix: one post into many formats", 11],
          ["Track your brand in AI search results", 11]
        ]
      },
      {
        "title": "Day 26: Crystal — Personality Insights",
        "lectures": [
          ["Look up a colleague's or prospect's communication style", 12],
          ["DISC personality types explained", 11],
          ["Write emails that match the reader's style", 11],
          ["Prepare for meetings with Meeting Insights", 11]
        ]
      },
      {
        "title": "Day 27: Chatfuel — AI for Instagram & WhatsApp",
        "lectures": [
          ["Set up an AI assistant for sales, bookings and marketing", 15],
          ["Add your services, prices and FAQs", 15],
          ["Test replies before going live", 15]
        ]
      },
      {
        "title": "Day 28: Conversica — AI Sales Conversations",
        "lectures": [
          ["Two-way AI follow-up with sales leads", 12],
          ["Industry-trained agents for hospitality, education, automotive and more", 11],
          ["Answers grounded in your own FAQs", 11],
          ["How to evaluate an enterprise AI tool", 11]
        ]
      }
    ],
    "requirements": [
      "No AI or coding experience needed",
      "A laptop or desktop computer with internet",
      "A Google account (most tools let you sign in with it)",
      "Most tools have a free plan that covers the practice tasks",
      "Some tools are paid or trial-only: Midjourney, Jasper, Beautiful.ai, Pictory, D-ID, Chatfuel, ClickUp Brain and Microsoft 365 Copilot (for your own files)",
      "Conversica is an enterprise tool with no free trial, so that day is taught through examples",
      "Wherever a tool is paid, the lesson shows you a free alternative, so you can practise without buying anything"
    ],
    "audience": [
      "Corporate professionals and managers who want to stay relevant as AI changes their role",
      "Consultants and small business owners who want practical, billable results from AI",
      "Fresh graduates and job seekers who want job-ready AI skills on their CV",
      "Marketing, sales and HR professionals who want AI for content, CRM and communication",
      "Anyone who wants to know which AI tool to use for which job, and what it costs"
    ],
    "description": [
      "AI is moving fast. Are your skills keeping up?",
      "AI is already changing how professionals research, communicate, analyse, create, market and automate their work. The question is no longer whether AI will matter. It already does. The question is how prepared you will be to work with it.",
      "You learn alongside three people throughout the challenge: Aditya, a mid-level corporate manager; Meera, who runs her own consultancy; and Yash, a recent graduate building job-ready skills.",
      "28 days. Practical skills. Real-world application.",
      "• RESEARCH WITH GREATER SPEED — discover information, compare sources, summarise findings",
      "• WRITE & COMMUNICATE BETTER — emails, reports, documents, rewriting, professional communication",
      "• ANALYSE INFORMATION — understand data, compare options, support decisions",
      "• CREATE PROFESSIONAL VISUALS — images, designs, social creatives, presentations",
      "• CREATE VIDEO CONTENT — scripts, AI avatars, AI video, social clips",
      "• WORK WITH VOICE & AUDIO — narration, text to speech, voice typing, clear calls",
      "• IMPROVE EVERYDAY PRODUCTIVITY — planning, meeting notes, organisation, faster execution",
      "• BUILD MARKETING & SALES CONTENT — campaigns, brand copy, CRM, chatbots, lead follow-up",
      "• AUTOMATE REPEATABLE WORK — AI automation and workflows",
      "Learn → Practise → Apply → Improve → Become AI-ready",
      "Every lesson shows you exactly where to click, gives you a real example, and asks you to try it on your own work. You'll also know what each tool costs before you sign up, so there are no surprises.",
      "Knowing about AI isn't the same as knowing how to use it. This challenge gives you time to explore, experiment and build skills you can apply to real work.",
      "28 days to start building the skills that matter in an AI-enabled workplace."
    ],
    "includes": [
      "28 daily lessons (40–60 minutes each)",
      "27 AI tools covered, with what's free vs paid explained for each",
      "25+ click-by-click walkthroughs with real examples",
      "30+ hands-on practice tasks on your own real work",
      "Ready-to-use prompt formulas you can reuse every day",
      "Quizzes after every topic",
      "Free alternatives suggested wherever a tool is paid",
      "Certificate of completion",
      "Watch lessons on mobile or desktop (practice works best on a computer)"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "n8n-agents": {
    "subtitle": "Go from complete beginner to building a working AI operations system for a real business: automations, AI agents, a knowledge-powered assistant, a phone voice agent and a multi-agent team. No coding background needed.",
    "learn": [
      "Build, test and publish n8n workflows on your own, from a booking form to scheduled daily reports",
      "Connect apps safely with credentials, APIs, webhooks and the HTTP Request node",
      "Use AI inside automations to classify messages, extract details and draft replies",
      "Build AI agents with chat models, memory, tools and clear instructions",
      "Give an agent your business knowledge (prices, policies, FAQs) using RAG and vector stores",
      "Connect a voice agent (Vapi or ElevenLabs) to n8n so it can answer calls, check availability and book jobs",
      "Build multi-agent teams with a supervisor and specialist agents",
      "Add human approval before an agent takes risky actions like refunds or discounts",
      "Share your tools with other AI apps using MCP (Model Context Protocol)",
      "Run automations in production with error alerts, evaluations, security and cost control",
      "Self-host n8n for free with Docker",
      "Scope, price and deliver automation projects for clients"
    ],
    "sections": [
      {
        "title": "Module 0: Welcome & Course Overview",
        "lectures": [
          ["What you'll build and how the course works", 10],
          ["The SparkFix project", 10]
        ]
      },
      {
        "title": "Module 1: Automation, AI Agents & n8n Foundations",
        "lectures": [
          ["Why automate, and when to use AI", 26],
          ["Workflows, nodes, triggers and executions", 26],
          ["Automation vs AI automation vs AI agent vs voice agent", 25],
          ["n8n Cloud vs self-hosted, plans and costs", 25],
          ["Lab: create your n8n account and tour the editor", 38],
          ["Map a business process before you build", 25]
        ]
      },
      {
        "title": "Module 2: Your First Workflow — Form → Table → Email",
        "lectures": [
          ["The n8n editor in depth", 31],
          ["Lab: build a booking form", 46],
          ["Lab: save every booking to a data table or Google Sheets", 46],
          ["Lab: send personalised confirmation emails with Gmail", 46],
          ["Testing, executions and publishing", 31],
          ["Using AI to write better messages", 30]
        ]
      },
      {
        "title": "Module 3: Logic, Routing & Scheduled Workflows",
        "lectures": [
          ["If and Switch routing", 35],
          ["Filter, Sort, Aggregate, Merge and more", 35],
          ["Lab: alert the owner about urgent jobs", 53],
          ["Lab: a 7:30 am daily job digest", 52],
          ["Loops and waiting", 35]
        ]
      },
      {
        "title": "Module 4: Data Mastery — JSON, Expressions & the Code Node",
        "lectures": [
          ["Items and JSON explained simply", 35],
          ["Expressions to reach any data", 35],
          ["Lab: clean messy names, phone numbers and dates", 52],
          ["The Code node for pricing rules", 34],
          ["Getting AI help with expressions", 34]
        ]
      },
      {
        "title": "Module 5: Credentials, APIs, Webhooks & HTTP Requests",
        "lectures": [
          ["How APIs work, and what status codes mean", 32],
          ["Keeping API keys and secrets safe", 32],
          ["Lab: weather-based demand alert using a free API", 49],
          ["Webhooks: letting other systems call n8n", 32],
          ["Lab: build a secured \"free slots\" API", 48],
          ["Import cURL, retries and pagination", 32]
        ]
      },
      {
        "title": "Module 6: AI Automations — LLMs, Prompts & Structured Output",
        "lectures": [
          ["How LLMs work (tokens, context, temperature)", 33],
          ["Lab: connect a chat model (free options included)", 49],
          ["The RCTRO prompt pattern for automations", 33],
          ["Lab: classify messages and extract booking details", 49],
          ["Guardrails, privacy and AI cost control", 33],
          ["Ready-made prompt pack", 33]
        ]
      },
      {
        "title": "Module 7: Building AI Agents in n8n",
        "lectures": [
          ["Inside the AI Agent node and the agent loop", 40],
          ["Lab: a chat agent with memory", 59],
          ["Tools and $fromAI(): giving your agent hands", 39],
          ["Lab: an agent that checks real slots and books jobs", 59],
          ["Memory, sessions and writing great instructions", 39],
          ["Testing and debugging agents", 39]
        ]
      },
      {
        "title": "Module 8: RAG — Giving Agents Your Business Knowledge",
        "lectures": [
          ["How RAG and embeddings work", 35],
          ["Chunking, overlap and metadata", 35],
          ["Choosing a vector store (Pinecone, Supabase, Qdrant and more)", 35],
          ["Lab: build a knowledge base from business documents", 53],
          ["Lab: an agent that answers prices and warranty questions accurately", 52],
          ["Keeping knowledge fresh and measuring answer quality", 35]
        ]
      },
      {
        "title": "Module 9: AI Voice Agents Connected to n8n",
        "lectures": [
          ["How voice agents work, and why speed matters", 34],
          ["Choosing a platform: Vapi, ElevenLabs Agents, Retell AI", 34],
          ["Lab: make your n8n tools voice-ready", 50],
          ["Lab: a Vapi phone receptionist that books real jobs", 50],
          ["Lab: the same agent on ElevenLabs", 50],
          ["Writing voice prompts", 34],
          ["Phone numbers, call logs and compliance", 33]
        ]
      },
      {
        "title": "Module 10: Multi-Agent Systems, MCP & Human-in-the-Loop",
        "lectures": [
          ["When one agent isn't enough", 37],
          ["Lab: a supervisor with booking, knowledge and complaints specialists", 55],
          ["Human approval for risky actions", 37],
          ["Lab: discounts that need the owner's approval", 55],
          ["MCP explained simply", 36],
          ["Lab: share your tools with Claude Desktop and other AI apps", 55]
        ]
      },
      {
        "title": "Module 11: Production — Errors, Evaluations, Security & Self-Hosting",
        "lectures": [
          ["Error handling so no booking disappears", 32],
          ["Lab: error alerts and safe fallbacks", 48],
          ["Evaluations to measure AI quality", 32],
          ["Monitoring and proving time saved", 32],
          ["Security checklist and prompt-injection defence", 32],
          ["Lab: self-host n8n free with Docker", 47],
          ["Backups, updates, costs and scaling", 32]
        ]
      },
      {
        "title": "Module 12: Capstone — The Complete AI Operations System",
        "lectures": [
          ["Lab: integrate and test everything end to end (10 test cases)", 70],
          ["Validation and handover pack", 47],
          ["Applying the blueprint to salons, gyms, coaching, retail, restaurants and real estate", 47],
          ["Delivering, pricing and maintaining client projects", 47],
          ["Prompt library and glossary", 47],
          ["Final mock exam", 47]
        ]
      }
    ],
    "requirements": [
      "No coding or AI experience needed",
      "A laptop or desktop with Chrome or Edge",
      "An email address and a Google account (for the Gmail and Sheets labs)",
      "n8n: free Cloud trial (no credit card), or the free self-hosted Community Edition (setup taught in Module 11)",
      "AI model: n8n Cloud's included credits, or a free Google Gemini API key",
      "Voice labs: Vapi or ElevenLabs browser test calls",
      "Optional paid costs: an n8n Cloud plan after the trial (from about €20/month), AI usage beyond free limits, and phone numbers and call minutes for a live voice agent"
    ],
    "audience": [
      "Complete beginners who want a guided path into automation and AI agents",
      "Small business owners who want fewer repetitive tasks and faster customer replies",
      "Freelancers and consultants who want to build and sell AI automations to clients",
      "Operations, support, sales and marketing staff who want to automate their own work",
      "Developers who want to prototype AI agents quickly without writing everything in code"
    ],
    "description": [
      "Stop just using AI. Start building AI systems that automate real business work.",
      "Most AI courses teach you to chat with AI. This one teaches you to build with it. You'll create a complete AI operations system for a real-style business, step by step, in n8n, the visual automation platform used by businesses and automation agencies worldwide.",
      "The whole course builds one system for one business. SparkFix Home Services is an appliance-repair company in Nashik owned by Meera, with nine technicians. Today they miss calls after 7 pm and retype every booking by hand. By the end, you'll have automated all of it.",
      "What you'll build:",
      "• 🤖 AI Agents that chat with customers, check availability and book jobs",
      "• 🎙️ AI Voice Agents that answer the phone after hours",
      "• 🧠 RAG Systems that answer from your own price lists and policies",
      "• ⚡ n8n Automations for forms, emails, routing and daily reports",
      "• 🔗 APIs & Webhooks so other systems can talk to your workflows",
      "• 🤝 Multi-Agent Systems with a supervisor and specialist agents",
      "• 🔐 Human approvals and MCP for safe, connected AI",
      "• 🏢 Business Automation that's production-ready, monitored and secure",
      "Every page follows the same rhythm: understand it, see it, do it in the real tool, check your knowledge, fix common mistakes, and apply it to the project. Each lab tells you exactly where to click, what to type and what you should see.",
      "Want to offer this as a service? The final module shows how to apply the same blueprint to six other industries, and how to scope, price, deliver and maintain automation projects for clients.",
      "✅ Beginner friendly",
      "✅ No advanced coding required",
      "✅ Practical, project-based learning",
      "✅ Free options first, wherever possible",
      "✅ Freelancing and agency guidance included",
      "From beginner to AI automation professional."
    ],
    "includes": [
      "13 modules, about 48 hours including hands-on work",
      "25 guided hands-on labs in real tools, with exact steps and troubleshooting tables",
      "12 practical assignments, one per module",
      "A capstone project: a complete AI operations system for a real-style business",
      "190+ quiz questions and a final mock exam",
      "A searchable prompt library with ready-to-copy AI prompts",
      "Copy-ready code and expressions for every lab",
      "A glossary of every technical term in plain language",
      "Narrated lessons with captions and a language switcher",
      "A guide to delivering and pricing automation projects for clients",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "wa-agent": {
    "subtitle": "Build your own WhatsApp bulk messaging workflow in 4 easy steps, using n8n, Google Sheets and the WhatsApp Business Platform from Meta. No coding needed, and you can finish the build in under 15 minutes.",
    "learn": [
      "Set up a trigger that starts your messaging automation",
      "Manage your message content and recipient list in Google Sheets",
      "Set a sending limit to control how many messages go out at a time",
      "Connect your workflow to WhatsApp through the Meta WhatsApp Business Platform",
      "Send messages using Meta-approved message templates",
      "See how the full automation works, from trigger to message delivery",
      "Apply the same workflow to customer updates, reminders and outreach"
    ],
    "sections": [
      {
        "title": "Step 1: Set Up the Trigger",
        "lectures": [
          ["How a trigger starts the whole automation", 4],
          ["Choosing when your messages should be sent", 4]
        ]
      },
      {
        "title": "Step 2: Connect Google Sheets",
        "lectures": [
          ["Organise recipients and message content in a sheet", 4],
          ["Connect the sheet to your workflow", 3]
        ]
      },
      {
        "title": "Step 3: Set a Sending Limit",
        "lectures": [
          ["Control how many messages are sent per run", 3],
          ["Why limits keep your sending safe and controlled", 3]
        ]
      },
      {
        "title": "Step 4: Connect WhatsApp Through Meta",
        "lectures": [
          ["Connect your WhatsApp Business account", 3],
          ["Use approved message templates", 3],
          ["Run the complete workflow and check delivery", 3]
        ]
      }
    ],
    "requirements": [
      "No coding experience needed",
      "A laptop or desktop computer",
      "An n8n account (free Cloud trial or free self-hosted version)",
      "A Google account for Google Sheets",
      "A Meta Business account with the WhatsApp Business Platform set up",
      "A phone number to register on the WhatsApp Business Platform",
      "At least one approved WhatsApp message template",
      "Recipients who have agreed to receive WhatsApp messages from your business",
      "Note: Meta may charge for template messages. Check current rates on Meta's WhatsApp Business pricing page."
    ],
    "audience": [
      "Small business owners who send regular updates to customers on WhatsApp",
      "Marketers and sales teams who want to save time on repeated messages",
      "Beginners who want a quick, practical first automation project",
      "Freelancers who want to offer WhatsApp automation to clients"
    ],
    "description": [
      "Create your own WhatsApp bulk messaging agent, from scratch.",
      "Sending the same WhatsApp message to dozens of customers one by one takes hours. In this free course, you'll build a working automation that does it for you, using a simple no-code workflow.",
      "Every step is explained clearly, so beginners can follow along easily:",
      "• A trigger starts the automation",
      "• Your message content and recipient list live in Google Sheets",
      "• A built-in limit keeps sending controlled",
      "• Messages go out through WhatsApp via Meta, using approved templates",
      "By the end, you'll have a ready-to-use WhatsApp messaging workflow, and a practical automation skill you can use for business updates, reminders and customer outreach.",
      "4 steps. 30 minutes. Free."
    ],
    "includes": [
      "A complete, working workflow built step by step",
      "4 easy steps, each explained for beginners",
      "Tools used: n8n, Google Sheets, Meta WhatsApp Business Platform",
      "Certificate of completion"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "agentic": {
    "subtitle": "Go from \"what is an AI agent?\" to designing, building, testing, securing and deploying real AI agents. Build them with code (Python, LangGraph, MCP) or without code (n8n), using free tools first.",
    "learn": [
      "Understand what turns a chatbot into an agent, and decide when an agent is the right solution and when it isn't",
      "Choose the right AI model for each task and estimate what an agent will cost to run",
      "Write system prompts, examples and structured JSON output that make agents reliable",
      "Give agents \"hands\" by building tools they can call safely to check slots, create bookings and draft quotes",
      "Build a knowledge base with RAG, embeddings and vector stores, so agents answer from your own documents with citations",
      "Apply proven agent patterns: ReAct, planning, reflection, routing and orchestrator-workers",
      "Build stateful agents in LangGraph with memory and human approval before risky actions",
      "Build an MCP server and connect it to Claude Desktop and your own agents",
      "Compare Google ADK, the OpenAI Agents SDK and the Claude Agent SDK, and pick the right framework",
      "Design multi-agent teams with supervisors and handoffs, and build one in CrewAI",
      "Build a complete agent without code in n8n",
      "Test agents with golden datasets and traces, protect them against the OWASP Agentic Top 10, and run them in production with monitoring and cost controls"
    ],
    "sections": [
      {
        "title": "Module 1: The Agentic Shift — What AI Agents Are",
        "lectures": [
          ["Chatbot, workflow or agent: knowing the difference", 10],
          ["The agent loop and the five building blocks of an agent", 10],
          ["How much autonomy to give an agent: a practical scale", 10],
          ["Measuring whether an agent is good", 10],
          ["When NOT to build an agent", 10],
          ["Lab: feel the difference between chat and tool-using AI", 15],
          ["Assignment: build an agent opportunity map", 10]
        ]
      },
      {
        "title": "Module 2: Inside the Agent's Brain — Models, Tokens & Costs",
        "lectures": [
          ["How language models turn text into decisions", 10],
          ["Today's model families and reasoning (\"thinking\") models", 10],
          ["Settings that control behaviour, such as temperature", 9],
          ["Lab: test models in Google AI Studio and get your free API key", 14],
          ["Estimating and cutting agent costs", 9],
          ["Model limitations every agent designer must plan for", 9],
          ["Optional lab: run a model on your own computer with Ollama", 14]
        ]
      },
      {
        "title": "Module 3: Instructing Agents — System Prompts & Structured Output",
        "lectures": [
          ["The messages an agent sees", 11],
          ["Anatomy of a strong agent system prompt", 11],
          ["Few-shot examples and step-by-step reasoning", 11],
          ["Roles, personas and boundaries", 11],
          ["Structured JSON output your code can trust", 10],
          ["Lab: build and test an intake classifier", 16],
          ["Common prompt failures, and treating prompts like code", 10]
        ]
      },
      {
        "title": "Module 4: Your Developer Workbench",
        "lectures": [
          ["Install Python and VS Code", 10],
          ["Virtual environments and packages", 10],
          ["Keep API keys secret with .env and .gitignore", 10],
          ["Lab: run your first coded model call", 15],
          ["Structured output with Pydantic", 10],
          ["Rate limits, errors and retries", 10],
          ["Using AI coding assistants responsibly", 10]
        ]
      },
      {
        "title": "Module 5: Tools & Function Calling — Giving Agents Hands",
        "lectures": [
          ["Why agents need tools, and how function calling works", 13],
          ["Defining tools: name, description, arguments", 13],
          ["Lab: build and test a booking agent", 20],
          ["The explicit tool loop that frameworks use", 13],
          ["Handling tool failures", 13],
          ["Tool safety rules that prevent disasters", 13]
        ]
      },
      {
        "title": "Module 6: Memory & Knowledge — RAG, Embeddings & Vector Stores",
        "lectures": [
          ["Short-term, working, long-term and knowledge memory", 12],
          ["Managing conversation context", 12],
          ["Embeddings and the RAG pipeline explained simply", 11],
          ["Chunking well, and choosing a vector store", 11],
          ["Build a knowledge base with Chroma", 11],
          ["Lab: build RAG with citations and test grounding", 17],
          ["Measuring retrieval quality, and long-term memory with privacy", 11]
        ]
      },
      {
        "title": "Module 7: Thinking Patterns — ReAct, Planning, Reflection & Routing",
        "lectures": [
          ["Start with the simplest design that works", 12],
          ["Workflow patterns: chaining, routing, parallel work", 12],
          ["ReAct, plan-and-execute and orchestrator-workers", 12],
          ["Reflection and evaluator-optimizer loops", 11],
          ["Lab: build a router and a reflection check before quotes go out", 17],
          ["Tree-of-thoughts and other advanced reasoning", 11]
        ]
      },
      {
        "title": "Module 8: Building with LangGraph",
        "lectures": [
          ["LangChain vs LangGraph: who does what", 14],
          ["Lab: a quick agent with create_agent", 20],
          ["Graph basics: state, nodes and edges", 14],
          ["Memory per customer, pausing and resuming", 14],
          ["Lab: build a graph with human approval", 20],
          ["Streaming progress, errors, limits and project structure", 13]
        ]
      },
      {
        "title": "Module 9: MCP — Connecting Agents to Any Tool or Data",
        "lectures": [
          ["The problem MCP solves: hosts, clients and servers", 13],
          ["Tools, resources and prompts; local vs remote servers", 13],
          ["Lab: build and test an MCP server with the MCP Inspector", 20],
          ["Connect your server to Claude Desktop and your LangGraph agent", 13],
          ["MCP security rules, registries and remote servers", 13],
          ["Agent-to-agent communication with A2A", 13]
        ]
      },
      {
        "title": "Module 10: Vendor Agent SDKs — OpenAI, Claude & Google ADK",
        "lectures": [
          ["One set of ideas across every SDK", 13],
          ["What to avoid in 2026: deprecated tools", 12],
          ["Lab: rebuild the agent in Google ADK on the free Gemini key", 19],
          ["OpenAI Agents SDK and Claude Agent SDK (optional, paid API)", 12],
          ["Microsoft Agent Framework overview", 12],
          ["A decision matrix for choosing a framework", 12]
        ]
      },
      {
        "title": "Module 11: Multi-Agent Systems — Teams, Handoffs & CrewAI",
        "lectures": [
          ["When you need more than one agent, and when you don't", 13],
          ["Supervisor, pipeline, handoff and critic architectures", 13],
          ["Designing roles and communication", 13],
          ["Lab: build and stress-test a CrewAI team", 20],
          ["How multi-agent systems fail", 13],
          ["Supervisors in LangGraph and handoffs in SDKs", 13]
        ]
      },
      {
        "title": "Module 12: No-Code Agents — n8n, Zapier & Make",
        "lectures": [
          ["Why and when to choose no-code", 13],
          ["Start n8n and learn the building blocks", 12],
          ["Lab: build an intake agent with memory and Google Sheets tools", 19],
          ["Add a human approval step", 12],
          ["Activate, monitor and stay safe", 12],
          ["Zapier and Make for agent workflows", 12]
        ]
      },
      {
        "title": "Module 13: Testing & Evaluating Agents",
        "lectures": [
          ["Why agent testing is different from normal software", 12],
          ["What to measure: outcomes, steps, content and cost", 12],
          ["Build a golden test dataset", 12],
          ["Code checks and LLM-as-judge", 11],
          ["Tracing every step in LangSmith", 11],
          ["Lab: build an evaluation suite with automated regression tests", 17]
        ]
      },
      {
        "title": "Module 14: Agent Security & Guardrails",
        "lectures": [
          ["Why agents are a new security problem", 11],
          ["Direct and indirect prompt injection", 11],
          ["The OWASP Top 10 for Agentic Applications", 11],
          ["Layered guardrails, permissions and sandboxes", 11],
          ["Human oversight that actually works", 10],
          ["Lab: guard and red-team your agent", 16],
          ["Responsible AI duties", 10]
        ]
      },
      {
        "title": "Module 15: Shipping to Production",
        "lectures": [
          ["Production readiness checklist", 12],
          ["Wrap the agent in an API and package it in a container", 12],
          ["Durable state, secrets and deployment options", 12],
          ["Monitoring, alerts, cost controls and fallbacks", 11],
          ["Model updates and incident response", 11],
          ["Lab: ship the agent as a service", 17]
        ]
      },
      {
        "title": "Module 16: Capstone — The Complete Agent Platform & Your Career",
        "lectures": [
          ["Assemble the complete platform", 13],
          ["Lab: end-to-end platform test", 20],
          ["Write a 30-day pilot plan", 13],
          ["Adapt the design to another industry or your own business", 13],
          ["Careers in agentic AI, and presenting your capstone as a portfolio project", 13],
          ["Final assessment", 13]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "No coding needed for the non-technical path. Basic Python helps on the technical path, and Module 4 sets everything up from zero",
      "A laptop or desktop (Windows, macOS or Linux) with a modern browser",
      "A Google account for a free Gemini API key (no card needed)",
      "A free ChatGPT or Claude account",
      "Python and VS Code (free, installed step by step in Module 4)",
      "n8n: free self-hosted version or a Cloud trial (Module 12)",
      "You never need to spend money to finish this course. OpenAI and Anthropic API comparisons are optional and every paid lab has a free alternative"
    ],
    "audience": [
      "Complete beginners who want a guided path into agentic AI, with a no-code option",
      "Developers who want to build agents with Python, LangGraph, MCP and vendor SDKs, including testing and deployment",
      "Business owners and managers who want to know where agents add value, what they cost and how to manage the risks",
      "Automation and no-code builders who want to add AI agents to n8n, Zapier or Make workflows",
      "Students and career changers who want a portfolio project and a clear path into agent-engineering roles"
    ],
    "description": [
      "AI is evolving from tools that answer prompts into systems that plan, use tools, remember, check their own work and take actions under human supervision.",
      "AI Agents & Agentic AI Mastery gives you a practical, structured path to understanding and building these systems. You don't just learn the ideas. You build one real agent platform, piece by piece, from a first tool call to a deployed, monitored and secured multi-agent system.",
      "The whole course builds one project for one business. FixWell Home Services is a repair company in Bengaluru with 26 technicians. Its operations head, Kavya Menon, handles 140+ requests a day across WhatsApp, the website and phone. Customers wait hours for quotes, technicians get double-booked, and staff search 200-page manuals for answers. Module by module, you build the FixWell Agent Platform that fixes this.",
      "What you'll build:",
      "• An intake and FAQ agent that answers from verified policies and manuals (RAG)",
      "• A booking agent that checks slots, creates jobs and drafts quotes using tools",
      "• An MCP server that any MCP-compatible AI app can use",
      "• A multi-agent dispatch team that triages, schedules and escalates",
      "• A no-code intake flow in n8n",
      "• An evaluation suite, guardrails and monitoring, so the platform is safe to trust",
      "Every module follows the same rhythm: explain, why it matters, see it, do it, practise, check, fix common mistakes, and apply it to the project.",
      "Tools you'll work with: LangChain • LangGraph • MCP • CrewAI • Google ADK • OpenAI Agents SDK • Claude Agent SDK • n8n • LangSmith • Chroma • Gemini • Ollama",
      "Most agent courses stop at demos. This one is built around reliability from the first module: testing, security, human approval and cost control. You'll also learn when not to use an agent.",
      "By the end, you'll have a working, documented agent platform, a security review, a deployment runbook and a portfolio capstone you can show employers or clients.",
      "Enrol now and start building intelligent AI agents."
    ],
    "includes": [
      "16 modules, about 21.5 hours of learning",
      "128 lessons across 400+ interactive screens",
      "18 hands-on labs in real tools",
      "15 practical assignments, one per module, plus a capstone project",
      "150 knowledge-check activities (multiple choice, drag-and-drop, matching, ordering and more)",
      "A final assessment of 50 scenario-based questions (75 minutes)",
      "A prompt library with 236 copy-ready prompts across 17 use cases and 19 industries",
      "Copy-ready code for every coded lab",
      "A glossary of 88 technical terms in plain language",
      "Troubleshooting guides for common errors in every module",
      "Narrated lessons with captions and a language switcher for 78 languages",
      "Two paths: technical (with code) and non-technical (no code)",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "wa-mastery": {
    "subtitle": "Build a complete WhatsApp business system from zero on Meta's official WhatsApp Business Platform: consent-based contact lists, approved templates, bulk campaigns, a reply inbox, an AI assistant, payments, automated customer journeys and analytics. Choose a no-code path or a technical path.",
    "learn": [
      "Set up and verify a Meta Business Portfolio, WhatsApp Business Account and business number the right way",
      "Send your first WhatsApp message through the official Cloud API, from n8n or from code",
      "Build a consent-first contact list with clean numbers, customer segments and automatic opt-out",
      "Write marketing and utility templates that get approved, with variables, images and buttons",
      "Run bulk campaigns from Google Sheets through n8n, paced to Meta's limits and fully logged",
      "Schedule campaigns with approval checks, safe retries, frequency caps and error alerts",
      "Capture every customer reply and delivery status through webhooks into a working inbox",
      "Create tap-to-reply menus and buttons so customers don't have to type",
      "Build an AI assistant that answers only from your business information and hands over to a person when needed, following Meta's 2026 AI policy",
      "Use AI to plan, write and design campaigns, and run fair A/B tests",
      "Take orders and payments on WhatsApp with Razorpay payment links",
      "Automate reminders, follow-ups, abandoned-cart messages and win-back campaigns",
      "Measure results with a dashboard, then secure and scale the system for real business use"
    ],
    "sections": [
      {
        "title": "Module 1: The WhatsApp Business Landscape",
        "lectures": [
          ["WhatsApp vs WhatsApp Business App vs WhatsApp Business Platform", 13],
          ["Why unofficial \"bulk sender\" tools put your number at risk", 13],
          ["The four Meta places you'll work in", 13],
          ["How messages go out and replies come back", 13],
          ["2026 pricing, messaging limits and the AI policy in plain language", 13],
          ["Hands-on: create your project blueprint", 20]
        ]
      },
      {
        "title": "Module 2: Business Portfolio, Verification & WhatsApp Business Account",
        "lectures": [
          ["What a Meta Business Portfolio is and why it comes first", 15],
          ["The name-matching rule for your documents (GST, Udyam and more)", 14],
          ["Business verification, including missing buttons and rejections", 14],
          ["Adding your team safely with two-factor security", 14],
          ["Display names and your business profile", 14],
          ["Planning your business phone number", 14]
        ]
      },
      {
        "title": "Module 3: Developer App, Test Number & Your First Message",
        "lectures": [
          ["Create a developer app with the WhatsApp use case", 16],
          ["Send your first message using Meta's free test number", 16],
          ["Every ID and token, and where to keep each one safely", 16],
          ["Create a permanent access token", 16],
          ["Send a message from n8n (no-code) or cURL (technical)", 16],
          ["Fix the most common errors", 15]
        ]
      },
      {
        "title": "Module 4: Consent-First Contact Lists",
        "lectures": [
          ["Meta's opt-in rules and India's data-protection context", 13],
          ["Collect opt-ins at the counter, by Google Form, click-to-chat link and QR code", 13],
          ["Clean and validate Indian mobile numbers", 13],
          ["Segments and tags that make campaigns relevant", 13],
          ["An easy, permanent STOP / opt-out process", 13],
          ["Hands-on: build a campaign-ready contact list", 20]
        ]
      },
      {
        "title": "Module 5: Message Templates That Get Approved",
        "lectures": [
          ["When you need a template", 14],
          ["Marketing, utility and authentication categories", 14],
          ["Header, body, footer and buttons within Meta's limits", 14],
          ["Variables and sample values", 14],
          ["Why templates get rejected and how to avoid it", 14],
          ["Hands-on: create utility and marketing templates, and send them from n8n", 20]
        ]
      },
      {
        "title": "Module 6: Bulk Campaign Pipeline I — From Sheet to WhatsApp",
        "lectures": [
          ["Messaging limits and sending speed explained", 17],
          ["Move from the test number to your real business number", 17],
          ["Plan campaigns and log every send in Google Sheets", 17],
          ["Build an n8n campaign sender with daily caps, batches and a dry-run switch", 17],
          ["The five-person rule: test before going live", 16],
          ["Read bulk errors: when to retry and when to fix", 16]
        ]
      },
      {
        "title": "Module 7: Bulk Campaign Pipeline II — Scheduling, Retries & Safety",
        "lectures": [
          ["Scheduled campaigns that run only when approved", 13],
          ["Frequency caps so no customer gets too many messages", 13],
          ["Safe retries for temporary errors", 13],
          ["Error alerts that notify a person", 13],
          ["Monitor quality ratings and limits, and know when to stop", 13],
          ["Hands-on: build a campaign budget calculator", 20]
        ]
      },
      {
        "title": "Module 8: Inbox & Webhooks — Hearing Every Reply",
        "lectures": [
          ["How webhooks work, explained simply", 18],
          ["Read message and delivery-status data", 18],
          ["Hands-on: log every reply to an inbox sheet", 28],
          ["Track delivered, read and failed messages", 18],
          ["Automate STOP handling and route questions to the right person", 18]
        ]
      },
      {
        "title": "Module 9: Interactive Messages & Menus",
        "lectures": [
          ["Reply buttons, list menus and location messages", 18],
          ["Writing within Meta's limits", 18],
          ["Hands-on: build a main menu and workshop-booking buttons", 26],
          ["Route each tap to the right response", 18]
        ]
      },
      {
        "title": "Module 10: The Business-Scoped AI Assistant",
        "lectures": [
          ["What Meta's 2026 policy allows for AI on WhatsApp", 18],
          ["Answer from your own FAQ and product sheets, not the AI's general knowledge", 18],
          ["Get a free Groq AI key and choose a model", 18],
          ["Hands-on: build the assistant in n8n with a hand-over to a person", 28],
          ["Test it with tricky questions before customers see it", 18]
        ]
      },
      {
        "title": "Module 11: AI Campaign Studio — Plan, Write, Design, Test",
        "lectures": [
          ["Where AI helps and where a person must decide", 18],
          ["Write campaign briefs and template versions for each segment with AI", 18],
          ["Create header images you have the right to use", 18],
          ["Run a fair A/B test and read the results", 18],
          ["What Meta's Marketing Messages API adds", 18]
        ]
      },
      {
        "title": "Module 12: WhatsApp Commerce & Payments",
        "lectures": [
          ["Design an order tracker with order IDs", 20],
          ["Build a tap-first order flow: product → quantity → area → confirm", 20],
          ["Create Razorpay payment links (test mode)", 20],
          ["Confirm payments safely", 20],
          ["Send receipts, and handle failed, expired and refunded payments", 20]
        ]
      },
      {
        "title": "Module 13: Automated Customer Journeys",
        "lectures": [
          ["Welcome, reminder, feedback, abandoned-cart and win-back journeys", 22],
          ["Exit rules that stop journeys when things change", 21],
          ["One daily n8n workflow that runs every journey", 21],
          ["A journey log so no one gets the same message twice", 21]
        ]
      },
      {
        "title": "Module 14: Analytics & Optimisation",
        "lectures": [
          ["The metrics that matter: delivered, read, reply, opt-out, orders, revenue, cost per order", 15],
          ["Build a campaign dashboard in Google Sheets", 15],
          ["Which orders came from which campaign", 15],
          ["WhatsApp Manager insights", 15],
          ["A 20-minute weekly review that ends in one tested change", 15]
        ]
      },
      {
        "title": "Module 15: Production, Security & Scaling",
        "lectures": [
          ["n8n Cloud or self-hosted?", 17],
          ["Keep secrets safe and rotate them", 17],
          ["Backups and an incident playbook", 17],
          ["Protect customer data and keep it only as long as needed", 17],
          ["When to move from Google Sheets to a database", 17]
        ]
      },
      {
        "title": "Module 16: Capstone, Industry Playbooks & Resources",
        "lectures": [
          ["Capstone: one customer through every part of the system, from contact list to payment and follow-up", 32],
          ["Adapt the blueprint to other industries", 22],
          ["Offer WhatsApp automation as a paid service", 22],
          ["Final assessment", 22],
          ["Prompt library, glossary and official resources", 22]
        ]
      }
    ],
    "requirements": [
      "No coding knowledge needed for the No-Code track",
      "A computer with a modern browser, and a smartphone with WhatsApp",
      "A Facebook account and a Google account",
      "You can learn on Meta's free test number. Business documents (such as GST or Udyam registration) are needed only when you verify a real business",
      "n8n: free Cloud trial or the free self-hosted version",
      "Groq free API key for the AI assistant",
      "Razorpay test mode for payments (no real money)",
      "Meta charges for template messages sent to real customers. The course explains 2026 pricing so you can plan your budget"
    ],
    "audience": [
      "Small business owners who want to send offers, reminders and order updates without risking their number",
      "Marketers and social media managers who want to run compliant WhatsApp campaigns and measure results",
      "Freelancers and agency owners who want a sellable WhatsApp automation service for local businesses",
      "Students and career changers who want a portfolio project in APIs, automation and AI",
      "Developers who want to work directly with the Cloud API, webhooks and production deployment"
    ],
    "description": [
      "WhatsApp isn't just a messaging app. It can become your business automation channel.",
      "Most businesses still forward offers by hand, answer the same questions all day and track orders in notebooks. Others try unofficial \"bulk sender\" tools and lose their number. This course shows you the safe, professional way to do it, using Meta's official WhatsApp Business Platform.",
      "The whole course builds one system for one business. GreenNest Plant Studio is a plant nursery in Baner, Pune, run by Anaya Deshpande with her cousin Rohit. They answer 120–180 WhatsApp chats a day by hand, forward festival offers one by one, forget plant-care reminders and track orders in a notebook. Module by module, you automate all of it.",
      "You'll build the system behind:",
      "Customer Lists → Campaigns → Templates → Messages → Replies → AI → Journeys → Analytics",
      "What you'll build:",
      "• A consent-first contact list with automatic opt-out",
      "• Approved message templates for offers, reminders and order updates",
      "• A bulk campaign pipeline that respects Meta's limits and logs every message",
      "• An inbox that captures every reply and delivery status",
      "• Tap-to-reply menus and booking buttons",
      "• An AI assistant that only talks about your business, and hands over to a person when needed",
      "• Order and payment flows with Razorpay",
      "• Automated reminders, follow-ups and win-back journeys",
      "• A dashboard that shows what's working",
      "Every lesson tells you exactly where to click, what to enter and what you should see, with a checklist and troubleshooting steps. Two tracks build the same system: No-Code with n8n and Google Sheets, or Technical with the API and code.",
      "Free-first tools: WhatsApp Cloud API • n8n • Google Sheets • Groq • ChatGPT, Claude or Gemini • Razorpay",
      "By the end, you'll have a complete, working WhatsApp business system that you can use for your own business or offer as a service to clients."
    ],
    "includes": [
      "16 modules, about 24 hours of learning",
      "120+ lessons with step-by-step setup screens",
      "58 hands-on tasks and practical assignments in real tools",
      "170+ knowledge-check activities (drag-and-drop, matching, ordering, calculations and more)",
      "A final assessment",
      "A 3-part capstone project covering the full system end to end",
      "22 AI prompt exercises plus a prompt library with 100+ ready-to-use prompts",
      "Ready-made workflows for campaigns, the inbox, the AI assistant and customer journeys",
      "Two tracks: No-Code (n8n + Google Sheets) and Technical (API, JSON, cURL, Node.js)",
      "Troubleshooting guides for common errors and template rejections",
      "A glossary and a list of official resources",
      "Narrated lessons with captions, in English and many Indian and global languages",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "omni-master": {
    "subtitle": "Go from your first prompt to a finished 40–60 second brand film using Google's AI video tools: Veo 3.1, Gemini Omni Flash, Google Flow and Nano Banana Pro. No video or AI experience needed.",
    "learn": [
      "Find your way around Google's AI video tools and know which one to use for each shot",
      "Work confidently in Google Flow: projects, models, aspect ratios, credits and downloads",
      "Create a \"look book\" of characters, products and locations with Nano Banana Pro",
      "Write video prompts like a director, covering subject, action, scene, camera, style and sound",
      "Generate cinematic scenes with Veo 3.1, including native sound and spoken dialogue",
      "Turn still images into controlled video, and design transitions using first and last frames",
      "Keep characters and products looking the same across scenes with Ingredients to Video",
      "Lengthen shots with Extend, and add or remove objects",
      "Create video from text, images, audio and video with Gemini Omni Flash, then edit it just by describing the changes",
      "Assemble a full film in Scenebuilder, add captions and titles, and export for every platform",
      "Label AI content honestly, check rights, and price video work for clients"
    ],
    "sections": [
      {
        "title": "Module 1: Google's AI Video Ecosystem",
        "lectures": [
          ["Google's AI video tools at a glance", 7],
          ["Veo 3.1 Lite, Fast and Quality: when to use each", 7],
          ["Gemini Omni Flash and how it differs from Veo", 7],
          ["Credits and plans explained", 7],
          ["SynthID, AI labels and responsible use", 7],
          ["Lab: explore Google Flow and Flow TV", 7],
          ["Assignment: write the film brief", 8]
        ]
      },
      {
        "title": "Module 2: Getting Started in Google Flow",
        "lectures": [
          ["Open Flow and create your first project", 8],
          ["Every control in the creation panel explained", 8],
          ["The right aspect ratio for each platform", 8],
          ["Lab: generate your first image and first video clip", 8],
          ["Review, keep, download and upscale results", 9],
          ["Quick video in the Gemini app", 9]
        ]
      },
      {
        "title": "Module 3: Visual Foundations with Nano Banana Pro",
        "lectures": [
          ["Why images come first", 7],
          ["The image prompt formula", 7],
          ["Light and lens language", 7],
          ["Design characters that stay consistent", 7],
          ["Create product scenes from a real product photo", 7],
          ["Lab: build the full look book", 7],
          ["Fix common image problems", 8]
        ]
      },
      {
        "title": "Module 4: Directing with Veo 3.1",
        "lectures": [
          ["From still image to motion", 10],
          ["The video prompt formula: subject, action, scene, camera, style", 10],
          ["Camera vocabulary and pacing short clips", 10],
          ["Native audio: sound effects, ambience and dialogue", 10],
          ["Lab: generate three directed scenes, including a spoken welcome line", 10],
          ["Review clips with a critical eye", 10]
        ]
      },
      {
        "title": "Module 5: Control & Consistency",
        "lectures": [
          ["Frames to Video: start from an approved image", 9],
          ["First and last frames for designed transitions (clay to bowl)", 9],
          ["Ingredients to Video for a consistent character and product", 9],
          ["Lab: create consistent shots with Frames and Ingredients", 9],
          ["Extend: continue a shot", 9],
          ["Insert and remove objects", 10]
        ]
      },
      {
        "title": "Module 6: Gemini Omni Flash — Multimodal Creation & Conversational Editing",
        "lectures": [
          ["What Gemini Omni Flash is", 9],
          ["Omni Flash or Veo 3.1: choosing the right one", 9],
          ["Create video from a mix of text, images, audio and video", 9],
          ["Conversational editing: change a clip just by describing it", 9],
          ["Short-form video for YouTube Shorts", 9],
          ["Lab: create and refine clips with Omni Flash", 10]
        ]
      },
      {
        "title": "Module 7: Capstone — Assemble, Finish & Deliver the Film",
        "lectures": [
          ["Assemble the brand film in Scenebuilder", 6],
          ["Finish with sound, captions, titles and AI labels", 5],
          ["Export for each platform (landscape and vertical reels)", 4],
          ["Lab: assemble and finish the complete film", 7],
          ["Rights and compliance checklist", 4],
          ["Client workflow and pricing", 5],
          ["Adapt the method to restaurants, electronics and other industries", 4],
          ["Final assessment", 25]
        ]
      }
    ],
    "requirements": [
      "No video or AI experience needed",
      "A Google account (you must be 18 or older)",
      "A computer with Chrome or Edge",
      "Google Flow: free daily credits cover a few practice drafts",
      "A paid Google AI plan (Plus, Pro or Ultra) gives more credits, higher resolution and extra features. It's optional, but helpful for completing every lab at full quality",
      "Video generation in the Gemini app needs an eligible Google AI plan",
      "Optional: Canva or DaVinci Resolve (free versions) for extra editing",
      "Credit costs and plan prices vary by country and change often. Always check the cost shown in Flow before generating"
    ],
    "audience": [
      "Small business owners who want product films, workshop promos and social reels without a film crew",
      "Content creators making cinematic shorts for YouTube and Instagram",
      "Marketers and agencies who want a repeatable Google-based video workflow",
      "Filmmakers and editors who want AI for pre-visualisation, B-roll and stylised shots",
      "Students and career changers who want a portfolio film and a video service they can sell"
    ],
    "description": [
      "From first prompt to professional AI film production.",
      "Creating an impressive AI video clip is one thing. Building a complete video with intentional scenes, consistent characters, controlled transitions, dialogue, sound, editing and a clear visual style needs a much deeper workflow. That's what this course teaches.",
      "You'll start by understanding Google's AI video tools and setting up Google Flow. Then you'll build the visual foundation of your film with Nano Banana Pro, write director-style prompts for Veo 3.1, design transitions with first and last frames, keep characters consistent with Ingredients to Video, add native sound and dialogue, and refine clips by simply describing changes to Gemini Omni Flash.",
      "In the final capstone, you bring it all together: assemble the film in Scenebuilder, add captions, titles and AI labels, and export it for every platform.",
      "The whole course builds one project for one business. Kaveri Clay Studio is a small pottery studio in Pune run by potter Anika Desai. She sells handmade mugs and planters and runs weekend wheel-throwing workshops, but has no video content. Module by module, you create her complete film kit.",
      "What you'll create:",
      "• A look book of characters, products and locations",
      "• A scene library of cinematic shots with native sound",
      "• Consistent character and product sequences",
      "• Short-form clips for YouTube Shorts and Reels",
      "• A finished 40–60 second brand film, plus vertical reels",
      "Tools: Veo 3.1 • Gemini Omni Flash • Google Flow • Nano Banana Pro • Gemini app",
      "Every lesson shows you exactly where to click and what you should see, gives you a ready-to-use prompt, and asks you to try it yourself in Flow.",
      "Don't just generate AI video. Learn to direct the complete workflow.",
      "Edition: 2026 (tools checked October 2026)."
    ],
    "includes": [
      "7 modules, about 6 hours 20 minutes of learning",
      "40+ lessons with click-by-click instructions",
      "7 hands-on labs in Google Flow and the Gemini app",
      "14 practice prompts written for Flow, with expected results and follow-ups",
      "6 practical assignments plus a capstone brand film",
      "65+ knowledge-check activities (drag-and-drop, matching, ordering and more)",
      "A final assessment: 30 scenario-based questions (45 minutes)",
      "A prompt library with 191 copy-ready prompts for 19 industries",
      "A glossary of 54 AI video terms in plain language",
      "Troubleshooting guides for common image and video problems",
      "Narrated lessons with captions and a language switcher for 78 languages",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "kling-master": {
    "subtitle": "Learn Kling AI 3.0 step by step: cinematic images, consistent characters, directed camera work, native sound, multi-shot storytelling, talking avatars and professional editing.",
    "learn": [
      "Understand the Kling 3.0 model family and choose the right model, mode and settings for each shot",
      "Plan credits like a producer so you don't waste generations",
      "Write cinematic image prompts covering subject, setting, light, lens and composition",
      "Edit images with plain-language instructions and combine multiple reference images",
      "Keep characters and objects consistent across every shot using Kling's Elements",
      "Write video prompts like a director: action, camera movement, pacing and native sound",
      "Bring still images to life, design transitions with start and end frames, and move only what you choose with Motion Brush",
      "Build connected multi-shot sequences with VIDEO 3.0 Omni and Custom Multi-Shot",
      "Direct exact character movement with Motion Control",
      "Create a talking presenter with Avatar 2.0 and lip-sync speech to faces",
      "Edit your film in Canva or DaVinci Resolve with sound, captions, titles and colour matching",
      "Label AI content, check rights, and price AI video work for clients"
    ],
    "sections": [
      {
        "title": "Module 1: Kling AI Foundations",
        "lectures": [
          ["What Kling AI is, and the Kling 3.0 model family", 8],
          ["Generation modes: the director's toolbox", 8],
          ["How credits work, and budgeting them", 8],
          ["Responsible and legal AI video", 8],
          ["Where Kling fits among other AI video tools", 8],
          ["Lab: explore Kling and map the model selector", 8],
          ["Assignment: write the film brief and shot list", 7]
        ]
      },
      {
        "title": "Module 2: Account, Plans & Interface Mastery",
        "lectures": [
          ["Create and secure your Kling account", 10],
          ["Choose the right plan", 9],
          ["Tour the creation workspace", 9],
          ["The right aspect ratio for every channel", 9],
          ["Lab: generate and save your first image", 9],
          ["Organise assets and history; use Kling on mobile", 9]
        ]
      },
      {
        "title": "Module 3: Cinematic Images with IMAGE 3.0: The Look Book",
        "lectures": [
          ["Why stills come first", 10],
          ["The cinematic image prompt formula", 10],
          ["Lighting, camera and composition language", 9],
          ["Design characters and create a character turnaround sheet", 9],
          ["Lab: create the character set", 9],
          ["Location and mood stills", 9],
          ["Fix common image problems", 9]
        ]
      },
      {
        "title": "Module 4: Editing, References & Elements: Consistent Characters",
        "lectures": [
          ["Why characters change between shots, and how to stop it", 10],
          ["Edit images with plain-language instructions", 10],
          ["Combine multiple reference images", 9],
          ["Elements: Kling's consistency system", 9],
          ["Lab: build and test character Elements", 9],
          ["Give characters a voice (VIDEO 3.0 Omni)", 9],
          ["Elements for objects and places", 9]
        ]
      },
      {
        "title": "Module 5: Text-to-Video: Directing with Words, Camera & Sound",
        "lectures": [
          ["From still to motion: what changes", 10],
          ["The video prompt formula", 10],
          ["Camera movement vocabulary", 10],
          ["Duration and pacing", 10],
          ["Native audio: sound and dialogue in the same generation", 10],
          ["Lab: generate your first three scenes, including a line of dialogue", 10],
          ["Review a clip with a critical eye", 10]
        ]
      },
      {
        "title": "Module 6: Image-to-Video, Start & End Frames, Motion Brush & Extend",
        "lectures": [
          ["Why image-to-video gives you more control", 10],
          ["Prepare a great starting image", 10],
          ["Motion prompts: describe what changes", 9],
          ["Start and end frames for designed transitions (dawn to dusk)", 9],
          ["Motion Brush: move only what you choose", 9],
          ["Extend: continue a shot", 9],
          ["Lab: animate the look book", 9]
        ]
      },
      {
        "title": "Module 7: Multi-Shot Storytelling with VIDEO 3.0 & Omni",
        "lectures": [
          ["What multi-shot generation is", 11],
          ["Film grammar for believable sequences", 11],
          ["Write a Custom Multi-Shot prompt shot by shot", 11],
          ["Use Omni references to keep characters and voices consistent", 11],
          ["Lab: build a rooftop sunset sequence", 11],
          ["Optional: plan sequences with an AI assistant such as ChatGPT, Claude or Gemini", 10]
        ]
      },
      {
        "title": "Module 8: Performance: Motion Control, Talking Avatars & Lip Sync",
        "lectures": [
          ["Three ways to control a performance", 8],
          ["Motion Control, using your own recorded movement", 8],
          ["Lab: a signature character gesture with Motion Control", 8],
          ["Avatar 2.0: talking presenters", 8],
          ["Write avatar scripts that sound natural, and choose voices and languages", 7],
          ["Lab: a 30-second talking welcome video", 7],
          ["Lip sync for existing clips", 7],
          ["Consent and disclosure for avatars", 7]
        ]
      },
      {
        "title": "Module 9: Post-Production: Editing, Sound, Captions & Export",
        "lectures": [
          ["Why AI clips still need editing", 7],
          ["Choose an editor: Canva or DaVinci Resolve", 7],
          ["The story edit", 7],
          ["Sound mixing: dialogue, ambience and licensed music", 7],
          ["Captions, titles and the AI label", 7],
          ["Colour consistency", 7],
          ["Lab: edit the hero film", 7],
          ["Export formats, thumbnails and quality checks", 6]
        ]
      },
      {
        "title": "Module 10: Capstone: Film Kit, Client Workflow & Industry Playbooks",
        "lectures": [
          ["What you deliver: the complete film kit", 9],
          ["Lab: final review of the film kit", 9],
          ["A professional client workflow and rights checklist", 9],
          ["Pricing AI video work", 9],
          ["Adapt the method to electronics stores, restaurants and other industries", 8],
          ["Your portfolio and next steps", 8],
          ["Final assessment", 8]
        ]
      }
    ],
    "requirements": [
      "No video, filming or editing experience needed",
      "A computer (recommended for editing) or a smartphone, with a modern browser",
      "A Kling AI account: the free plan gives daily credits and covers every lab",
      "Free plan videos have a watermark and can't be used commercially. A paid Kling plan is needed for watermark-free, commercial or client work",
      "Canva (free plan) for editing; DaVinci Resolve (free) is optional",
      "Optional: ChatGPT, Claude or Gemini (free plans) for planning scripts and shot lists"
    ],
    "audience": [
      "Complete beginners who have never made a video",
      "Business owners who want ads, product films and social reels without a film crew",
      "Content creators who want consistent characters and cinematic shots for YouTube and Instagram",
      "Marketers and agencies who want a repeatable AI video workflow for client work",
      "Filmmakers, editors and students who want a portfolio film and a video service they can sell"
    ],
    "description": [
      "Anyone can generate an AI video. Can you direct one?",
      "AI video has moved beyond simple text-to-video experiments. The real skill now is knowing how to create the right visual, control movement, keep characters consistent, connect multiple shots, and turn separate clips into a complete cinematic story.",
      "Kling AI: In-Depth Mastery takes you from your first Kling image to a finished, publish-ready film. You'll work with the Kling AI 3.0 tools, including IMAGE 3.0, VIDEO 3.0, VIDEO 3.0 Omni, Elements, Motion Brush, Motion Control, Avatar 2.0 and Lip Sync.",
      "What you'll create:",
      "• A look book of cinematic character and location stills",
      "• Reusable character Elements that stay consistent in every shot",
      "• A scene library of directed shots with camera moves and native sound",
      "• A 45–60 second multi-shot promo film with dialogue and transitions",
      "• A talking presenter avatar video",
      "• A social media kit of vertical reels, with captions and an AI-content label",
      "The core workflow:",
      "Idea → Frame → Prompt → Create → Direct → Control → Consistency → Edit → Produce",
      "Every lesson shows you exactly where to click and what you should see, gives you a ready-to-use Kling prompt, and asks you to try it yourself.",
      "This isn't about randomly generating AI clips and hoping something works. It's about learning to think like a director while working with AI."
    ],
    "includes": [
      "10 modules, about 10 hours of learning",
      "79 lessons with click-by-click instructions",
      "11 hands-on labs in Kling",
      "17 practice prompts written for Kling, with settings, expected results and follow-ups",
      "9 practical assignments plus a capstone film project",
      "99 knowledge-check activities (drag-and-drop, matching, ordering and more)",
      "A final assessment: 40 scenario-based questions (60 minutes)",
      "A prompt library with 202 copy-ready prompts for 19 industries",
      "A glossary of 71 AI video and Kling terms in plain language",
      "Troubleshooting guides for common image and video problems",
      "Narrated lessons with captions and a language switcher for 78 languages",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "genai-complete": {
    "subtitle": "Go from your first AI chat to running a complete AI toolkit for real work: writing, images, voice, video, research, data, automation and strategy, used responsibly. No prior AI experience needed.",
    "learn": [
      "Understand how generative AI works, why it sometimes gets things wrong, and where it should and shouldn't make decisions",
      "Set up ChatGPT and Claude as real workspaces, using Projects, memory, files, custom instructions, GPTs and Artifacts",
      "Try agentic AI with Claude Cowork and Claude Code, with free alternatives provided",
      "Choose the right assistant for each task: ChatGPT, Claude, Gemini, Copilot or Perplexity",
      "Write prompts that work every time with the CRAFTED framework, then advance to examples, prompt chains, JSON output, self-critique and meta-prompting",
      "Build a content engine: brand voice guide, product descriptions at scale, social posts, emails and WhatsApp messages",
      "Create and edit campaign images with ChatGPT, Nano Banana, Canva, Adobe Firefly and Midjourney",
      "Produce voice-overs in English and Hindi with ElevenLabs, and background music with Suno",
      "Plan and generate short videos with Veo and Runway, and assemble a finished Reel in Canva",
      "Research with cited sources, ask questions of your own documents in NotebookLM, and analyse sales data",
      "Build no-code automations in Zapier and Make, including an AI step with human approval",
      "Use AI for strategy: SWOT, 90-day plans, customer journeys and SOPs",
      "Protect privacy, reduce bias, respect copyright, and label AI content under Indian and EU rules"
    ],
    "sections": [
      {
        "title": "Module 1: How Generative AI Really Works",
        "lectures": [
          ["What generative AI actually is", 9],
          ["How a language model turns your prompt into an answer", 8],
          ["Tokens and context windows, explained simply", 8],
          ["Why AI makes things up (hallucinations)", 8],
          ["Where AI helps, and where it shouldn't decide", 8],
          ["The AI tool landscape, and free vs paid plans", 8],
          ["Lab: your first side-by-side test of ChatGPT and Claude", 13],
          ["Assignment: your AI starting plan", 13]
        ]
      },
      {
        "title": "Module 2: ChatGPT — From First Chat to Power User",
        "lectures": [
          ["Tour of the ChatGPT interface", 10],
          ["Choosing a model or mode", 10],
          ["Custom instructions and memory", 10],
          ["Lab: build a ChatGPT Project with a brand facts file", 14],
          ["Working with documents, spreadsheets and images", 9],
          ["Search, image generation, deep research and agent mode", 9],
          ["GPTs: custom versions of ChatGPT for one job", 9],
          ["Desktop, mobile, sharing and data controls", 9]
        ]
      },
      {
        "title": "Module 3: Claude — Projects, Artifacts, Cowork & Claude Code",
        "lectures": [
          ["Why learn a second assistant", 8],
          ["Tour of Claude, choosing models, and setting preferences and styles", 8],
          ["Memory and privacy in Claude", 8],
          ["Lab: build and test a Claude Project", 12],
          ["Artifacts: build an interactive size-guide tool", 8],
          ["Research, web search and connectors", 8],
          ["Cowork: agentic AI for knowledge work (lab with a free-plan alternative)", 12],
          ["Claude Code for non-coders: build a small web page", 8],
          ["Claude or ChatGPT? A practical guide", 8]
        ]
      },
      {
        "title": "Module 4: Gemini, Copilot, Perplexity & Choosing the Right Assistant",
        "lectures": [
          ["Tour of the Gemini app, and its plans in India", 9],
          ["Lab: create a custom Gem for captions", 13],
          ["Microsoft Copilot inside Microsoft 365", 9],
          ["Lab: research with Perplexity, then check the citations", 13],
          ["Other assistants, and a word of caution", 8],
          ["Build your assistant selection matrix", 8]
        ]
      },
      {
        "title": "Module 5: Prompt Engineering — Beginner to Advanced",
        "lectures": [
          ["The CRAFTED framework, and rebuilding a weak prompt step by step", 11],
          ["Let the AI ask you questions first", 11],
          ["Examples (few-shot) to get your style", 11],
          ["Step-by-step reasoning and prompt chains", 11],
          ["Structured output: tables, CSV and JSON", 10],
          ["Self-critique loops and meta-prompting", 10],
          ["Lab: build and test your prompt library in Google Sheets", 16],
          ["Prompt injection: when content gives the AI orders", 10]
        ]
      },
      {
        "title": "Module 6: AI Writing & Content Creation",
        "lectures": [
          ["Build a brand voice guide from your best writing", 9],
          ["Lab: generate 10 product descriptions in Google Sheets", 13],
          ["Social media posts that don't sound generic, and a two-week content calendar", 9],
          ["Emails and WhatsApp messages, including a four-email launch sequence", 9],
          ["Long-form articles and search", 9],
          ["Repurposing one idea into many formats", 9],
          ["Editing with AI while keeping your own voice", 9],
          ["Originality, AI detectors and disclosure", 8]
        ]
      },
      {
        "title": "Module 7: AI Image Generation & Editing",
        "lectures": [
          ["What AI images are for, and what they're not for", 9],
          ["Anatomy of an image prompt", 9],
          ["Lab: create a campaign mood board in ChatGPT", 13],
          ["Edit real product photos with Nano Banana in Gemini", 9],
          ["Midjourney for premium artistic images (paid)", 9],
          ["Canva AI and Adobe Firefly for design-ready work", 9],
          ["Keep a consistent look across a campaign", 9],
          ["Rights, truthfulness and labelling", 8]
        ]
      },
      {
        "title": "Module 8: AI Voice, Audio & Music",
        "lectures": [
          ["Writing scripts for the ear", 8],
          ["Lab: produce English and Hindi voice-overs in ElevenLabs", 12],
          ["Voice cloning and consent", 8],
          ["Lab: generate a background track with Suno", 11],
          ["Clean-up and mixing basics", 8],
          ["Podcast-style audio from your own documents", 8]
        ]
      },
      {
        "title": "Module 9: AI Video Creation",
        "lectures": [
          ["What AI video can realistically do in 2026", 8],
          ["Plan first: shot list, storyboard and video prompts", 8],
          ["Lab: generate a clip with Veo in Gemini or Flow", 13],
          ["Runway and budgeting your credits", 8],
          ["AI avatars and presenters", 8],
          ["Lab: assemble a finished Reel in Canva with voice, music and captions", 13],
          ["Labelling AI video responsibly", 12]
        ]
      },
      {
        "title": "Module 10: AI for Research, Documents & Data Analysis",
        "lectures": [
          ["A research workflow you can trust", 10],
          ["Which research tool for which job", 10],
          ["Lab: run deep research and verify five claims", 14],
          ["Lab: build a knowledge notebook in NotebookLM", 14],
          ["Analyse sales data with ChatGPT and Claude", 9],
          ["Let AI write your spreadsheet formulas", 9],
          ["Turn findings into decisions", 9]
        ]
      },
      {
        "title": "Module 11: Automation & AI Agents",
        "lectures": [
          ["What an automation is, with technical words explained simply", 8],
          ["Zapier, Make or n8n?", 8],
          ["Design before you build", 8],
          ["Lab: an enquiry-alert automation in Zapier (free plan)", 12],
          ["Lab: AI-drafted replies with human approval in Make", 12],
          ["Keeping keys, permissions and data safe", 8],
          ["n8n for technical learners", 8],
          ["AI agents: when a fixed workflow isn't enough", 8],
          ["Monitoring and error handling", 8]
        ]
      },
      {
        "title": "Module 12: AI for Business Strategy & Operations",
        "lectures": [
          ["AI as a strategy partner, not the strategist", 10],
          ["Competitor positioning and an evidence-based SWOT", 10],
          ["A 90-day plan with measurable goals", 10],
          ["Customer journey mapping with Claude Artifacts", 10],
          ["Turn rough notes into SOPs, training and meeting notes", 10],
          ["What-if scenarios and pre-mortems", 10]
        ]
      },
      {
        "title": "Module 13: Responsible AI — Privacy, Bias, Copyright & the Law",
        "lectures": [
          ["Personal data and India's DPDP Act", 8],
          ["Privacy-safe AI habits", 8],
          ["Spotting and reducing bias", 8],
          ["Copyright and ownership of AI content", 8],
          ["Labelling synthetic media under Indian and EU rules", 12],
          ["AI-powered scams and account safety", 8],
          ["Write a one-page AI-use policy", 8]
        ]
      },
      {
        "title": "Module 14: Capstone — Your AI Operating Kit, Career & Staying Current",
        "lectures": [
          ["Assemble the complete AI Operating Kit", 8],
          ["Lab: an end-to-end test, from product idea to customer", 12],
          ["Write a 30-day adoption plan", 8],
          ["Adapt the kit to any industry or to your own work", 8],
          ["Keep up with AI without drowning", 8],
          ["Evaluate any new AI tool in 15 minutes", 8],
          ["Your portfolio, career next steps and personal learning plan", 8],
          ["Final assessment", 15]
        ]
      }
    ],
    "requirements": [
      "No prior AI or coding experience needed",
      "A laptop or desktop with a modern browser, and a smartphone for sign-in codes",
      "A Google account (most tools sign in with it)",
      "Free plans of ChatGPT, Claude, Gemini, NotebookLM and Perplexity cover most labs",
      "Canva and Google Sheets (free)",
      "Optional: ElevenLabs, Suno and Runway free tiers (practice only, with limits on commercial use)",
      "Optional: Zapier and Make free plans",
      "Some features need paid plans: Claude Cowork and Claude Code, Midjourney (no free plan), and video generation in Gemini. Every lesson that uses a paid feature also gives you a free alternative, so you never need to buy anything to finish the course"
    ],
    "audience": [
      "Complete beginners who want a structured, practical start with AI",
      "Business owners and freelancers who want to save hours every week on writing, replies, research and planning",
      "Marketers and content creators who want on-brand copy, images, audio and video, faster",
      "Technical learners who want APIs, JSON output, automation and Claude Code",
      "Students and job seekers who want a portfolio project and the AI skills employers expect"
    ],
    "description": [
      "From AI user to professional AI power user.",
      "Using AI is easy. Using it well is a skill. Most people use AI like a search box and get average results. The gap between average and excellent isn't secret tricks. It's knowing how these systems work, giving them the right context, checking what they produce, and connecting tools into a workflow. That's what this course teaches, step by step.",
      "The whole course builds one project for one business. Kalaa Threads is a handloom clothing boutique in Aundh, Pune, owned by Meera Joshi. She and her two team members spend more than 15 hours a week on captions, product descriptions, customer replies and admin. Module by module, you build her complete AI Operating Kit to launch the Monsoon Weaves collection and cut routine work in half.",
      "What you'll explore:",
      "• ChatGPT & Claude, set up as power-user workspaces",
      "• Gemini, Copilot and Perplexity, and when to use each",
      "• Prompt engineering, from beginner to advanced",
      "• AI writing and content creation",
      "• AI image generation and editing",
      "• AI voice, audio and music",
      "• AI video creation",
      "• Research, documents and data analysis",
      "• No-code automation and AI agents",
      "• Business strategy and operations",
      "• Responsible AI: privacy, bias, copyright and the law",
      "What you'll walk away with:",
      "• Working ChatGPT and Claude workspaces",
      "• A tested prompt library",
      "• A brand voice guide and content engine",
      "• An image, audio and video kit",
      "• A research and data pack",
      "• Two working automations",
      "• A strategy pack and an AI-use policy",
      "• A 30-day plan to put AI to work in your own role or business",
      "Tools you'll use: ChatGPT • Claude • Gemini • Copilot • Perplexity • NotebookLM • Midjourney • Nano Banana • Canva • Adobe Firefly • ElevenLabs • Suno • Runway • Veo • Zapier • Make • n8n • and more",
      "Every lesson shows you exactly where to click, gives you a real example, and asks you to try it yourself straight away.",
      "Move beyond experimenting with AI. Learn to select, prompt, combine and apply AI tools in real work."
    ],
    "includes": [
      "14 modules, about 17 hours of learning",
      "119 lessons with click-by-click instructions",
      "25+ AI tools covered hands-on",
      "18 hands-on labs in real tools",
      "32 ready-to-use AI prompt exercises",
      "13 practical assignments plus a capstone project",
      "140+ knowledge-check activities (drag-and-drop, matching, ordering and more)",
      "A final assessment: 40 scenario-based questions (60 minutes)",
      "A prompt library with 294 copy-ready prompts across 18 use cases and 19 industries",
      "A glossary of 78 AI terms in plain language",
      "Troubleshooting guides in every module",
      "Two tracks: Non-technical (no code) and Technical (APIs, JSON, Claude Code)",
      "Narrated lessons with captions and a language switcher for 78 languages",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "mj-advanced": {
    "subtitle": "Go from your first prompt to a complete professional brand image library using Midjourney V8.2 and its latest 2026 features: Style References, Personalization, Moodboards, the Edit Model, the Editor and Video.",
    "learn": [
      "Write clear, descriptive prompts with the Five-Layer method",
      "Control the shape, style strength, variety and randomness of your images with parameters (aspect ratio, Stylize, Raw, Chaos, Weird, seed, tile)",
      "Lock in a consistent brand look with Style References, Style codes, Personalization and Moodboards",
      "Use your own product photos with Image Prompts and the V8.2 Edit Model, including placing real products and keeping characters consistent",
      "Fix and extend images in the Editor (inpainting and outpainting), and choose the right upscaler",
      "Work faster with Draft Mode, Variations, Remix and Conversational Mode",
      "Turn still images into short videos with motion, seamless loops and start-to-end frames",
      "Organise your image library, and export at the right size for social media, websites and print",
      "Finish images in Canva or Photoshop with real text and logos",
      "Use Midjourney responsibly and professionally for commercial and client work"
    ],
    "sections": [
      {
        "title": "Module 1: How Midjourney Thinks: Foundations",
        "lectures": [
          ["What's new in 2026: V8.2, HD and the Edit Model", 11],
          ["How text becomes an image", 11],
          ["What Midjourney does brilliantly, and where it struggles", 11],
          ["The model line-up and when to use each", 11],
          ["Rights, respect, the public gallery and commercial use", 11],
          ["Hands-on: write a visual brief and shot list", 10],
          ["Labs: short vs described prompts, comparing model versions", 10]
        ]
      },
      {
        "title": "Module 2: Getting In: Plans, GPU Time & a Tour of the Website",
        "lectures": [
          ["Basic, Standard, Pro and Mega plans compared", 11],
          ["GPU time explained: Fast, Relax and Turbo; SD vs HD costs", 11],
          ["Stealth mode and the public gallery", 11],
          ["Tour of Explore, Create, Edit, Personalize, Organize and Tasks", 11],
          ["Hands-on: subscribe, set safe defaults and make a test image", 11],
          ["Optional: create on Discord", 10],
          ["Labs: SD vs HD, Fast vs Relax, settings vs parameters", 10]
        ]
      },
      {
        "title": "Module 3: The Language of Prompts",
        "lectures": [
          ["Describe, don't instruct", 13],
          ["The Five-Layer Prompt", 12],
          ["Vocabulary for medium, light, colour, mood and composition", 12],
          ["Diagnose and fix weak prompts", 12],
          ["Text inside images", 12],
          ["Hands-on: create the first four project shots, starting with the hero mug", 12],
          ["Labs: Five-Layer Prompt, lighting vocabulary, text in images", 12]
        ]
      },
      {
        "title": "Module 4: Control Dials: Essential Parameters",
        "lectures": [
          ["Aspect ratio for every placement", 12],
          ["Stylize and Raw", 12],
          ["Variety (Chaos) and Weird", 12],
          ["--no, seed and tile", 11],
          ["HD vs SD, and --exp", 11],
          ["Hands-on: the Stylize ladder and a seamless packaging pattern", 11],
          ["Labs: product recipe, Chaos, Weird, Exp, tile and seed", 11]
        ]
      },
      {
        "title": "Module 5: Lock the Look: Style References, Personalization & Moodboards",
        "lectures": [
          ["Style References and style weight (--sw)", 14],
          ["Style codes and the Style Explorer", 14],
          ["Personalization profiles", 13],
          ["Moodboards", 13],
          ["Hands-on: find style codes and build the brand moodboard", 13],
          ["Assignment: write a brand style card", 13]
        ]
      },
      {
        "title": "Module 6: Your Own Images: Image Prompts, the Edit Model & Describe",
        "lectures": [
          ["Image prompts and image weight", 12],
          ["The V8.2 Edit Model: edit with words and combine up to 4 references", 12],
          ["Place real products and keep characters consistent", 12],
          ["Change perspective and restyle images", 11],
          ["Describe: get prompt ideas from an image", 11],
          ["Rights to the images you upload", 11],
          ["Hands-on: place a real mug in a café scene", 11]
        ]
      },
      {
        "title": "Module 7: Fix the Frame: The Editor, Pan, Zoom & Upscalers",
        "lectures": [
          ["The Editor: erase and repaint areas (inpainting)", 13],
          ["Expand the canvas (outpainting)", 13],
          ["Pan and Zoom Out", 13],
          ["Vary Region", 12],
          ["Upscalers and HD", 12],
          ["Hands-on: fix a detail, and turn a feed post into a website banner", 12]
        ]
      },
      {
        "title": "Module 8: Iterate Like a Pro: Variations, Remix, Conversational & Draft Modes",
        "lectures": [
          ["Choose images with clear criteria", 10],
          ["Subtle and strong variations", 10],
          ["Remix", 10],
          ["Conversational Mode", 10],
          ["Seeds for controlled comparisons", 10],
          ["Draft Mode: 24 quick concepts", 10],
          ["Hands-on: run a Diwali concept funnel", 10]
        ]
      },
      {
        "title": "Module 9: Still to Story: Midjourney Video",
        "lectures": [
          ["Animate: Auto, Manual and Loop", 10],
          ["Low and high motion", 10],
          ["Start and end frames", 10],
          ["Extend clips up to 21 seconds", 10],
          ["Batch size, SD/HD and costs", 10],
          ["Hands-on: animate the hero mug and make a Diwali start-to-end clip", 10],
          ["Download clips for social media", 10]
        ]
      },
      {
        "title": "Module 10: Organize & Deliver: Library, Sizes & Export",
        "lectures": [
          ["The Organize page: search, filters and folders", 11],
          ["Likes and ratings", 11],
          ["Image size and resolution", 11],
          ["The right sizes for social media, websites and print", 11],
          ["Download images and videos", 11],
          ["Hands-on: organise the full project library", 10]
        ]
      },
      {
        "title": "Module 11: Professional Use: Rights, Ethics & Client Workflow",
        "lectures": [
          ["Commercial use and plan conditions", 10],
          ["Ethics: real people, brands and artists' styles", 10],
          ["Honest disclosure in marketing", 10],
          ["Finish images in Canva or Photoshop with real text and logos", 10],
          ["Print and merchandise considerations", 10],
          ["A step-by-step client workflow", 10],
          ["Hands-on: finish the workshop poster", 10]
        ]
      },
      {
        "title": "Module 12: Capstone, Industry Playbooks & Mock Exam",
        "lectures": [
          ["Capstone: assemble and quality-check the complete brand image kit", 18],
          ["Industry applications", 18],
          ["Write your portfolio case study", 18],
          ["Prompt library and glossary", 17],
          ["Mock exam", 17],
          ["Labs: capstone hero image, campaign series, teaser clip", 17]
        ]
      }
    ],
    "requirements": [
      "No art or design background needed",
      "A computer (recommended) or phone with a modern browser",
      "A paid Midjourney subscription for the hands-on image tasks. Midjourney has no free plan; planning tasks work without one",
      "A Google account for the free planning documents",
      "A few photos of your own real products for the reference-image modules",
      "Optional: a Discord account, and Canva or Photoshop for adding final text"
    ],
    "audience": [
      "Complete beginners who want a calm, step-by-step path to images they're proud of",
      "Small business owners who want product scenes, social posts and campaign visuals without a monthly photoshoot",
      "Marketers and content creators who want consistent, on-brand images and short animated clips",
      "Designers and illustrators who want a fast concepting partner and a professional workflow",
      "Freelancers and students who want a portfolio project and a responsible way to offer AI imagery to clients"
    ],
    "description": [
      "Anyone can generate an AI image. But can you control the result?",
      "This course takes you from your very first prompt to a complete, professional image library made with Midjourney. It teaches only the features that exist today in V8.2, so you won't waste time on outdated tutorials.",
      "What you'll master:",
      "• Core prompting with the Five-Layer method",
      "• Aspect ratio, Stylize, Chaos and Weird",
      "• Style References and style control",
      "• Personalization and Moodboards",
      "• Character and product consistency with the V8.2 Edit Model",
      "• Inpainting and outpainting in the Editor",
      "• Draft Mode and Conversational Mode",
      "• Image-to-video creation",
      "• Finishing in Canva and Photoshop",
      "• Organising and exporting your library",
      "• A complete brand identity capstone",
      "Prompt → Control → Create → Refine → Consistency → Animate",
      "Every module includes Midjourney Labs: ready-to-copy prompts you run in Midjourney itself, with a next prompt and a pro variation to push further. You also get hands-on tasks with exact steps, what you should see, and troubleshooting.",
      "By the end, you'll have a complete, portfolio-ready brand image kit, and the skills to create consistent, professional imagery for your own business or for clients.",
      "From your first Midjourney image to professional creative workflows. Don't just generate. Create with control."
    ],
    "includes": [
      "12 modules, about 15.5 hours of learning",
      "74 lessons with click-by-click instructions",
      "36 Midjourney Labs: copy-ready prompts with an Open Midjourney button, a next prompt and a pro variation",
      "32 hands-on tasks and practical assignments",
      "12 AI planning prompts (briefs, style cards, export specs, client checklists)",
      "115+ knowledge-check activities (drag-and-drop, matching, ordering and more)",
      "A complete brand image kit capstone project",
      "A mock exam",
      "A prompt library with 108 Midjourney prompts by industry and use case",
      "A glossary of Midjourney terms",
      "Narrated lessons with captions in many Indian and global languages",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "claude-code": {
    "subtitle": "Build, edit, debug and publish real websites, apps and tools with Claude Code, without needing to know how to code.",
    "learn": [
      "Turn a plain-language idea into a real, working website, step by step",
      "Make targeted edits to the part you want, without rebuilding everything",
      "Choose the right model, effort level and permission mode for every task",
      "Use Plan Mode to structure bigger projects before a single file is written",
      "Recover from any mistake using checkpoints and rewind",
      "Publish your project live on the internet with Netlify and push updates anytime",
      "Build interactive apps that save real data, such as trackers and dashboards",
      "Find and fix bugs with a repeatable debugging loop",
      "Connect your real data through MCP connectors like Google Drive",
      "Teach Claude your project's rules with CLAUDE.md",
      "Create Skills, Routines, Subagents and Plugins to automate repeat work",
      "Build and ship a complete real project of your own in the capstone"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Claude Code and When to Use It",
        "lectures": [
          ["How Claude Code differs from a regular Claude chat", 9],
          ["Where it excels, and where another tool is a better fit", 8],
          ["What you need before you start, including the paid-plan requirement", 8]
        ]
      },
      {
        "title": "Module 2: Getting Started: Install, Interface, First Build",
        "lectures": [
          ["Installing the desktop app on your computer", 8],
          ["A tour of the Chat, Browse and Diff working view", 8],
          ["Opening your project folder and sending your first request", 7],
          ["Practice: Set up and build your first real page", 7]
        ]
      },
      {
        "title": "Module 3: From Idea to a Real Website",
        "lectures": [
          ["Real scenario: a website for a weekend bakery that has only had an Instagram page", 8],
          ["Reading Claude's explanation of what it built and why", 8],
          ["Adding new sections without rebuilding the page", 7],
          ["Practice: Build and refine your own page", 7]
        ]
      },
      {
        "title": "Module 4: Targeted Edits: Refine Without Starting Over",
        "lectures": [
          ["Edits that touch several related files correctly", 7],
          ["Pointing Claude at a specific file", 6],
          ["Reverting a bad edit and iterating until it's right", 6],
          ["PART 2: WORKING SMART AND SAFELY", 6]
        ]
      },
      {
        "title": "Module 5: The Three Dials: Model, Effort and Permission Mode",
        "lectures": [
          ["Picking the right model and effort level", 8],
          ["All five permission modes: Manual, Accept Edits, Plan Mode, Auto and Bypass", 8],
          ["Working within your usage limits", 7],
          ["Practice: Set all three dials for a real task", 7]
        ]
      },
      {
        "title": "Module 6: Plan Mode for Bigger Projects",
        "lectures": [
          ["When a project needs a plan", 9],
          ["What a good plan covers", 8],
          ["Refining a plan before you approve it", 8]
        ]
      },
      {
        "title": "Module 7: Checkpoints and Recovering From Mistakes",
        "lectures": [
          ["How automatic checkpoints work", 9],
          ["Rewinding with a double press of Escape", 8],
          ["Reverting one edit versus rewinding a whole session", 8]
        ]
      },
      {
        "title": "Module 8: Publishing: From Your Folder to a Live Site",
        "lectures": [
          ["Publishing with Netlify", 5],
          ["Pushing updates to a live site", 5],
          ["Checking your site on phone and desktop", 5],
          ["Practice: Publish and update a real project", 5],
          ["PART 3: BUILDING REAL TOOLS", 5]
        ]
      },
      {
        "title": "Module 9: Building Interactive Apps",
        "lectures": [
          ["Static sites compared with data-holding apps", 8],
          ["Real scenario: building a study tracker", 8],
          ["Testing a feature by actually using it", 7],
          ["Practice: Build a working tracker for study, habits or water intake", 7]
        ]
      },
      {
        "title": "Module 10: Adding Features Without Breaking What Works",
        "lectures": [
          ["Telling safe changes from risky ones", 9],
          ["Asking Claude to explain existing logic before changing it", 8],
          ["Checking that existing features still work", 8]
        ]
      },
      {
        "title": "Module 11: Debugging Real Issues",
        "lectures": [
          ["Describing a bug's symptoms clearly", 7],
          ["Letting Claude find the real cause", 6],
          ["Pushing a verified fix live, and a repeatable debugging loop", 6],
          ["PART 4: ADVANCED FEATURES AND AUTOMATION", 6]
        ]
      },
      {
        "title": "Module 12: MCP Connectors: Bring In Your Real Data",
        "lectures": [
          ["What MCP does", 10],
          ["Connecting Google Drive", 10],
          ["Referencing real documents in build requests and migrating data", 10]
        ]
      },
      {
        "title": "Module 13: CLAUDE.md: Teach Claude Your Project's Rules",
        "lectures": [
          ["Writing rules Claude follows", 10],
          ["Testing a rule in a fresh session", 10],
          ["How CLAUDE.md differs from automatic memory", 10]
        ]
      },
      {
        "title": "Module 14: Skills: Reusable Expertise on Demand",
        "lectures": [
          ["Writing a description that triggers the Skill at the right time", 10],
          ["Testing when a Skill should and shouldn't activate", 10],
          ["Real example: a design review Skill", 10]
        ]
      },
      {
        "title": "Module 15: Routines: Automate Repeatable Work",
        "lectures": [
          ["Writing a scheduled routine", 10],
          ["Starting as a draft before going fully automatic", 10],
          ["Kinds of work worth automating", 10]
        ]
      },
      {
        "title": "Module 16: Subagents: Delegate Parallel Work",
        "lectures": [
          ["When a subagent helps", 9],
          ["An important limitation around permission prompts", 8],
          ["Reading the subagent's summary report", 8]
        ]
      },
      {
        "title": "Module 17: Plugins: Install Ready-Made Capabilities",
        "lectures": [
          ["What a plugin bundles", 8],
          ["Installing a plugin and using it for a design critique", 8],
          ["Acting on the feedback you get", 7],
          ["PART 5: APPLY, STAY SAFE AND SHIP", 7]
        ]
      },
      {
        "title": "Module 18: Professional Use Cases",
        "lectures": [
          ["Student: a portfolio site to share coursework with recruiters", 10],
          ["Job seeker, working professional, business owner, content creator and freelancer", 10],
          ["Practice: Build a workflow for your own role", 10]
        ]
      },
      {
        "title": "Module 19: Responsible Use, Safety and Limits",
        "lectures": [
          ["Claude Code's real limitations", 9],
          ["Choosing permission modes based on real stakes", 8],
          ["Handling sensitive data, and knowing when to bring in a professional developer", 8]
        ]
      },
      {
        "title": "Module 20: Capstone: Build and Ship a Real Project",
        "lectures": [
          ["7 phases: frame, plan, build, refine, debug, automate (optional), publish", 23],
          ["Use at least six features from the course in one connected workflow", 22]
        ]
      },
      {
        "title": "Module 21: Claude Code Prompt Library",
        "lectures": [
          ["83 ready-to-use prompts in 15 categories", 30]
        ]
      }
    ],
    "requirements": [
      "No coding experience needed",
      "A laptop or desktop computer, on Windows or Mac",
      "A paid Claude plan (Pro or above) to use Claude Code",
      "A free Netlify account for publishing (set up in the course)"
    ],
    "audience": [
      "Students who want a portfolio site or study tools",
      "Job seekers who want to show real, shipped projects",
      "Working professionals who want to automate tasks and build internal tools",
      "Business owners who want their own website or booking tool without hiring an agency",
      "Content creators and freelancers who want to build client projects faster",
      "Anyone with an idea who has been held back by \"I don't know how to code\""
    ],
    "description": [
      "You have an idea for a website, an app or a tool. Now you can build it yourself.",
      "Claude Code is Anthropic's AI that builds real software from plain-language instructions. It writes files, fixes bugs and publishes your work. Most people never get past the first try, though, because they don't know how to plan, edit, debug or keep control of what it builds.",
      "This course teaches you the full workflow. You start with your first real page in Module 2. Then you learn to refine it precisely, recover from mistakes, publish it live, turn it into an interactive app, and fix real bugs.",
      "Next you unlock the advanced features professionals use: MCP connectors for your real data, CLAUDE.md for project rules, and Skills, Routines, Subagents and Plugins to automate repeat work.",
      "You'll follow real scenarios, like Meera turning her Instagram-only weekend bakery into a proper website, or Arjun, an engineering student, building a portfolio site to share with recruiters. Every module ends with a practice task on your own project.",
      "In the capstone you take your own idea through planning, building, debugging and publishing, and finish with a live site you can share.",
      "Stop waiting for a developer. Start building it yourself."
    ],
    "includes": [
      "10 hours of guided, hands-on lessons",
      "21 modules: 20 core modules plus a prompt library",
      "36 guided prompt exercises you try in Claude Code",
      "25 practice tasks built around your own project",
      "35 quiz checks to confirm your understanding",
      "83 ready-to-use prompts across 15 categories",
      "A 7-phase capstone where you ship a live project",
      "Certificate of completion",
      "Access on mobile and desktop",
      "Access for 20 days"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "claude-master": {
    "subtitle": "Using Claude like ChatGPT? You're missing most of the point. Learn to use Claude as a real reasoning partner for serious work, mostly on Claude's free plan.",
    "learn": [
      "Understand what makes Claude different: a reasoning partner, not just a faster chatbot",
      "Turn vague requests into well-framed prompts that get thoughtful answers",
      "Set up Projects so Claude remembers your files and instructions for recurring work",
      "Build interactive tools, documents and code with Artifacts, and edit them without starting over",
      "Use creative techniques (constraints, metaphors and multiple perspectives) to get fresh ideas",
      "Apply business frameworks with Claude: SWOT, VRIO, Porter's Five Forces, BCG Matrix and scenario planning",
      "Think in systems: trace second- and third-order effects before you decide",
      "Revise writing for clarity and tone, and handle sensitive messages with care",
      "Turn long documents and multiple sources into real insight, not just summaries",
      "Ask Claude to challenge your reasoning, and explore options beyond yes-or-no decisions",
      "Use Memory, Connectors (MCP), file and image analysis, Extended Thinking and Skills",
      "Combine features into complete workflows for your own role",
      "Know Claude's limits, handle confidential information safely, and cite AI-assisted work properly"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Claude & When to Use It",
        "lectures": [
          ["What Claude is, in plain words", 5],
          ["A different design philosophy: a reasoning partner", 5],
          ["Where Claude excels, and where it struggles", 5],
          ["Claude vs other AI tools", 5],
          ["What's free and what's paid", 5]
        ]
      },
      {
        "title": "Module 2: Getting Started — Signup, Interface & Plans",
        "lectures": [
          ["Create your account step by step", 6],
          ["A tour of the screen", 6],
          ["Upload a file and ask a question about it", 6],
          ["Free vs Pro: what you actually get", 6],
          ["The four building blocks of the course", 6]
        ]
      },
      {
        "title": "Module 3: Structured Prompting — Giving Claude a Frame",
        "lectures": [
          ["What a good prompt frame contains", 8],
          ["Turn a vague request into a framed one", 8],
          ["When a task needs the full frame, and when it doesn't", 8],
          ["Why Claude asking you a question is a good sign", 6]
        ]
      },
      {
        "title": "Module 4: Projects — Your Persistent Workspace",
        "lectures": [
          ["Set up a Project for recurring work", 8],
          ["Add files and custom instructions", 8],
          ["Revise a Project without losing context", 8],
          ["When a Project beats a plain chat", 6]
        ]
      },
      {
        "title": "Module 5: Artifacts — Interactive Tools, Documents & Code",
        "lectures": [
          ["Build an interactive tool from a plain description", 8],
          ["What Artifacts can produce", 8],
          ["Make targeted edits without starting over", 8],
          ["When to choose Artifacts over plain chat", 6]
        ]
      },
      {
        "title": "Module 6: Creative Prompting",
        "lectures": [
          ["Use constraints to sharpen creative output", 8],
          ["Think through metaphors for a fresh angle", 8],
          ["Ask for multiple perspectives on the same problem", 8],
          ["When creative techniques help, and when they add noise", 6]
        ]
      },
      {
        "title": "Module 7: Analytical Frameworks",
        "lectures": [
          ["SWOT: strengths, weaknesses, opportunities, threats", 6],
          ["VRIO: is your advantage real?", 6],
          ["Porter's Five Forces: the competitive landscape", 6],
          ["BCG Matrix: where each product sits", 6],
          ["Scenario planning for uncertainty", 6],
          ["Combine two frameworks for richer analysis", 5]
        ]
      },
      {
        "title": "Module 8: Systems Thinking",
        "lectures": [
          ["Trace cause-and-effect chains", 8],
          ["Connect one idea across different areas", 8],
          ["Reason through second- and third-order effects", 8],
          ["Spot when an analysis has stopped too early", 6]
        ]
      },
      {
        "title": "Module 9: Writing & Revision",
        "lectures": [
          ["Revise for clarity without losing structure", 8],
          ["Adjust tone for a different audience", 8],
          ["Keep long documents consistent", 8],
          ["Write sensitive messages with care", 6]
        ]
      },
      {
        "title": "Module 10: Information Synthesis",
        "lectures": [
          ["Summary vs interpretation: the real difference", 8],
          ["Get insight from long documents faster", 8],
          ["Find unexpected connections between sources", 8],
          ["When a summary is enough", 6]
        ]
      },
      {
        "title": "Module 11: Strategic Thinking & Testing Your Reasoning",
        "lectures": [
          ["Use Claude as a sounding board that pushes back", 6],
          ["Tell real pushback from empty disagreement", 6],
          ["Explore options beyond yes-or-no choices", 6],
          ["Question constraints you've treated as fixed", 6],
          ["Clarify what matters most", 6]
        ]
      },
      {
        "title": "Module 12: Memory & Personalization",
        "lectures": [
          ["Turn on Memory and know what it remembers", 6],
          ["Memory vs Projects", 6],
          ["View, edit or clear what Claude remembers", 6],
          ["When to turn Memory off", 7]
        ]
      },
      {
        "title": "Module 13: Connectors & MCP",
        "lectures": [
          ["What MCP does, in plain language", 8],
          ["Connect a tool such as Google Drive, Gmail or GitHub", 8],
          ["Local vs remote connectors", 8],
          ["Which plans support which connectors", 6]
        ]
      },
      {
        "title": "Module 14: Files, Images & Vision",
        "lectures": [
          ["Upload and analyse documents with the right context", 8],
          ["Read charts, diagrams and photos accurately", 8],
          ["Work with multiple files at once", 8],
          ["What the context window means in practice", 6]
        ]
      },
      {
        "title": "Module 15: Extended Thinking",
        "lectures": [
          ["What happens when Claude reasons step by step", 6],
          ["Turn on Extended Thinking for hard problems", 6],
          ["Choose the right effort level", 6],
          ["When it's unnecessary", 7]
        ]
      },
      {
        "title": "Module 16: Skills — Reusable Instructions for Recurring Work",
        "lectures": [
          ["What a Skill is and how it differs from a Project", 8],
          ["Build a Skill with your own instructions and reference material", 8],
          ["How Skills activate automatically", 8],
          ["When a Skill is worth building", 6]
        ]
      },
      {
        "title": "Module 17: Combining Features into Workflows",
        "lectures": [
          ["Decision guide: Project, Skill or plain chat?", 8],
          ["Decision guide: standard response or Extended Thinking?", 8],
          ["Decision guide: Claude alone, or with other AI tools?", 8],
          ["Chain features into one connected workflow", 6]
        ]
      },
      {
        "title": "Module 18: Professional Use Cases",
        "lectures": [
          ["Complete workflow: Student", 4],
          ["Complete workflow: Job seeker", 4],
          ["Complete workflow: Working professional", 4],
          ["Complete workflow: Business owner", 4],
          ["Complete workflow: Content creator", 4],
          ["Complete workflow: Freelancer or consultant", 4],
          ["Hands-on: build a workflow for your own role", 6]
        ]
      },
      {
        "title": "Module 19: Responsible AI & Limitations",
        "lectures": [
          ["Claude's honest limitations", 6],
          ["When you need a qualified human, not a better prompt", 6],
          ["Handling confidential information", 6],
          ["Citing AI-assisted work in academic and professional settings", 7]
        ]
      },
      {
        "title": "Module 20: Capstone — Build a Strategic Deliverable",
        "lectures": [
          ["Phase 1: frame your problem", 6],
          ["Phase 2: gather and synthesise information", 6],
          ["Phase 3: apply an analytical framework", 6],
          ["Phase 4: trace systemic effects", 6],
          ["Phase 5: stress-test your thinking", 6],
          ["Phase 6: draft the deliverable", 6],
          ["Phase 7: final verification check", 9]
        ]
      },
      {
        "title": "Bonus: Claude Prompt Library",
        "lectures": [
          ["106 ready-to-use prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No AI or technical experience needed",
      "A laptop, desktop or phone with a browser",
      "A free Claude account (sign up with email or Google, no card needed)",
      "The free plan covers almost the whole course: web search, file analysis, Projects, Artifacts, Memory and file creation",
      "Optional: a paid Claude plan (Pro) for the most capable model (Opus), Deep Research and remote connectors",
      "Optional: the Claude desktop app for local connectors"
    ],
    "audience": [
      "Beginners who want to get far more out of Claude than basic questions",
      "Students who want better research, writing and critical thinking",
      "Working professionals who need clear analysis, reports and communication",
      "Business owners and consultants who want a strategic thinking partner",
      "Content creators and freelancers who want better writing and repeatable workflows"
    ],
    "description": [
      "Using Claude like ChatGPT? You're missing most of the point.",
      "Claude can do much more than answer questions. It's built to reason with you: to frame problems, test your thinking, analyse situations with proven frameworks, synthesise information into insight, and help you write with clarity and care.",
      "This course teaches you to use Claude as a real reasoning partner for serious work.",
      "What you'll learn:",
      "• Structured prompting",
      "• Projects",
      "• Artifacts",
      "• Creative prompting",
      "• Analytical frameworks (SWOT, VRIO, Porter's Five Forces, BCG and more)",
      "• Systems thinking",
      "• Writing and revision",
      "• Information synthesis",
      "• Strategic thinking",
      "• Memory and personalization",
      "• Connectors and MCP",
      "• Files, images and vision",
      "• Extended Thinking",
      "• Skills",
      "Prompt → Think → Analyse → Create → Build → Connect",
      "Every module includes practice prompts you run in Claude straight away, plus a \"Your turn\" task on your own real work. The course ends with a capstone where you build a complete strategic deliverable, from framing the problem to a verified final draft.",
      "Don't use a powerful AI platform only for basic questions. Master Claude. Put it to work."
    ],
    "includes": [
      "20 modules, about 10 hours of learning (25–45 minutes per module)",
      "96 lessons explained in plain language",
      "43 guided practice prompts you run in Claude as you learn",
      "25 hands-on \"Your turn\" tasks on your own real work",
      "Ready-made workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: build a complete strategic deliverable with Claude",
      "Knowledge checks in every module",
      "A prompt library with 106 ready-to-use Claude prompts",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "claude-excel": {
    "subtitle": "Learn to use Claude for Excel, Anthropic's official Excel add-in, to explain and fix formulas, clean messy data, analyse numbers, build pivot tables and dashboards, and automate recurring reports, all inside your own workbook.",
    "learn": [
      "Install Claude for Excel and start safely with any important workbook using the Trust Test",
      "Get any formula explained in plain language before you change it",
      "Trace an error to its real root cause, not just the cell where it shows up",
      "Build new formulas by describing what you need, without writing the syntax yourself",
      "Test formulas against edge cases before trusting them",
      "Clean messy data exports, and approve each change before Claude makes it",
      "Answer business questions properly: define the terms, break down averages, run what-if scenarios and compare options",
      "Build and reshape pivot tables just by describing your question",
      "Create charts and one-screen dashboards that tell a clear story",
      "Audit every number back to its source before presenting it",
      "Turn your weekly or monthly reports into reusable Skills that run on request or on a schedule"
    ],
    "sections": [
      {
        "title": "Module 1: Meet Claude for Excel",
        "lectures": [
          ["Install the add-in step by step (Windows and Mac)", 6],
          ["Which plans and Excel versions it works with", 6],
          ["The Trust Test: start safely with any important workbook", 6],
          ["Run your first skill and see Claude show its work", 6],
          ["Where the add-in's limits are", 6],
          ["Hands-on: run your own Trust Test", 10]
        ]
      },
      {
        "title": "Module 2: Formulas You Can Trust",
        "lectures": [
          ["The Formula Loop: Explain, Trace, Build, Test", 8],
          ["Get any formula explained in plain language", 8],
          ["Trace an error to its real root cause", 8],
          ["Build a new formula by describing what you need", 8],
          ["Test it against edge cases before trusting it", 8],
          ["Hands-on: run the full Formula Loop on your own sheet", 15]
        ]
      },
      {
        "title": "Module 3: Tame the Messy Export — Data Cleaning",
        "lectures": [
          ["Audit, Ask, Approve, Verify", 8],
          ["Audit a messy export before touching anything", 8],
          ["Treat unclear blanks as questions, not gaps to guess", 8],
          ["Claude's permission system: approve or deny each change before it happens", 8],
          ["Verify the cleanup worked", 8],
          ["Hands-on: clean a real messy dataset", 15]
        ]
      },
      {
        "title": "Module 4: Answers Your Manager Will Trust — Analysis & What-If",
        "lectures": [
          ["Define, Break Down, Flex, Compare", 8],
          ["Define what a term means before asking the question", 8],
          ["Break an average apart to find the real story", 8],
          ["What-if scenarios: change one assumption and see the impact", 8],
          ["Compare options side by side before recommending one", 8],
          ["Hands-on: run the full analysis chain", 15]
        ]
      },
      {
        "title": "Module 5: Pivot Tables Made Simple",
        "lectures": [
          ["A pivot table is a question, not just a report format", 8],
          ["When to use a pivot table vs a formula", 8],
          ["Build a pivot summary by describing your question", 8],
          ["Reshape it: add dimensions, change measures, regroup", 8],
          ["Reconcile the totals before presenting", 8],
          ["Hands-on: build and reshape a real pivot", 15]
        ]
      },
      {
        "title": "Module 6: The Story in One Screen — Charts & Dashboards",
        "lectures": [
          ["The Chart Brief: describe the insight, not just the chart type", 11],
          ["Build a trend chart, then add a breakdown that explains why", 11],
          ["Combine several charts into one clear dashboard", 11],
          ["Audit the dashboard by tracing every number to its source", 11],
          ["Hands-on: build your own one-screen dashboard", 16]
        ]
      },
      {
        "title": "Module 7: Automate with Skills — Recurring Reports",
        "lectures": [
          ["Save your weekly report routine as a reusable Skill", 8],
          ["Create a Skill with Claude's guided setup", 8],
          ["Run it on demand, and spot when it hits an unusual case", 8],
          ["On request or on a schedule: how to decide", 8],
          ["Combine everything from Modules 2–6 into one automated process", 8],
          ["Hands-on: turn your own recurring process into a Skill", 15]
        ]
      },
      {
        "title": "Module 8: Your Claude for Excel Recap",
        "lectures": [
          ["The 7-word summary of the whole workflow", 6],
          ["A quick-reference map of every framework", 6],
          ["Your complete Claude for Excel toolkit", 6],
          ["The one habit worth keeping: check before you trust", 6],
          ["Final knowledge check", 11]
        ]
      }
    ],
    "requirements": [
      "Basic familiarity with Excel; no formula expertise needed",
      "A Microsoft 365 subscription with desktop Excel (Windows or Mac). Excel 2016/2019 perpetual versions and Excel on Android aren't supported",
      "A paid Claude plan (Pro or higher). Claude for Excel isn't available on the free plan",
      "\"Code execution and file creation\" switched on in Claude settings (for Skills, Module 7)",
      "Your own spreadsheet data to practise on, or the course examples"
    ],
    "audience": [
      "Analysts who want to speed up formulas, cleaning and reporting without losing accuracy",
      "Managers who need trustworthy numbers and clear dashboards",
      "Small business owners who track sales, stock or expenses in Excel",
      "Accountants and finance staff who build recurring reports",
      "Students and job seekers who want practical Excel + AI skills on their CV"
    ],
    "description": [
      "What if your manager asks tomorrow, \"Can we automate this report with AI?\" Would you know where to start?",
      "AI is moving beyond chat and into the tools people use every day, including spreadsheets. Claude for Excel puts an AI assistant directly inside your workbook. It can read your formulas, clean your data, build pivot tables and charts, and automate the reports you rebuild every week.",
      "But an AI answer is only useful if you can trust it. This course teaches you to use Claude for Excel and to check its work, so the numbers you present are numbers you can stand behind.",
      "Learn to work with Claude for:",
      "• Formula explanation and investigation",
      "• Root-cause analysis of errors",
      "• Data cleaning",
      "• What-if scenarios",
      "• Pivot tables",
      "• Charts and dashboards",
      "• Auditing every number back to its source",
      "• Recurring report Skills",
      "Every module gives you a simple framework, real worked examples showing the exact prompt and what Claude does in the sheet, and a hands-on task on your own data.",
      "Formulas you can trust. Answers you can check.",
      "Don't wait until AI becomes part of your responsibilities to start learning it. Excel + AI is a skillset worth building now."
    ],
    "includes": [
      "8 modules, about 7 hours of learning",
      "36 lessons with click-by-click instructions",
      "27 worked prompt examples showing the exact prompt and the real result in Excel",
      "7 hands-on \"Your turn\" tasks on your own data",
      "50+ knowledge-check activities (multiple choice, ordering, fill-in-the-blanks and more)",
      "A simple, memorable framework for every skill",
      "Real examples for analysts, business owners, students and managers in every module",
      "A final recap with a quick-reference map",
      "Certificate of completion"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "claude-deep": {
    "subtitle": "Still using Claude mainly for questions, emails and summaries? Learn to use Claude as a complete work system: files, research, Office documents, interactive tools, code, delegation, design and business workflows.",
    "learn": [
      "Choose the right part of Claude for every task (Chat, Connectors, Projects, Skills, Artifacts, Claude Code, Cowork or Claude Design) using a simple 4-question Surface Selector",
      "Connect Google Drive and other tools so Claude can work with your real files",
      "Tell Web Search, Extended Thinking and Research apart, and run a full citation-backed Research report",
      "Check and verify AI answers before you rely on them",
      "Create real Word documents, Excel sheets with working formulas, and PowerPoint decks straight from Claude",
      "Stop re-explaining yourself by setting up Memory, Projects and Skills",
      "Build working interactive tools with Artifacts, and improve them without starting over",
      "Install Claude Code and build, test and document a working script on your own computer",
      "Delegate multi-step tasks to Claude Cowork safely, and schedule them once tested",
      "Build clickable prototypes in Claude Design and hand them off to Canva, Figma or Claude Code",
      "Combine everything into one weekly workflow, then save it as a reusable Skill (your SOP)",
      "Use the Claude for Small Business plugin with a safe approval step before anything is sent"
    ],
    "sections": [
      {
        "title": "Module 1: Choosing Your Claude Surface",
        "lectures": [
          ["A tour of Claude's interface", 8],
          ["The Surface Selector: 4 questions that point every task to the right tool", 8],
          ["Three people, three different tasks, worked through step by step", 8],
          ["Build your own surface-selection prompt", 8],
          ["The two mistakes almost everyone makes", 8]
        ]
      },
      {
        "title": "Module 2: Bringing Real Work In — Connectors",
        "lectures": [
          ["What Connectors are and how they work", 10],
          ["Hands-on: create a practice tracker in Google Sheets, connect Google Drive, and ask questions about it", 15],
          ["Combine more than one source in one request", 10],
          ["The Connector Audit: catch wrong or outdated data", 10],
          ["When a manual upload works better than a Connector", 10]
        ]
      },
      {
        "title": "Module 3: Thinking, Researching, Verifying",
        "lectures": [
          ["Fact, Think or Investigate? Web Search vs Extended Thinking vs Research", 14],
          ["Use Extended Thinking on a hard, multi-condition problem", 14],
          ["Run a full Research task and get a citation-backed report", 14],
          ["Verify what comes back", 13]
        ]
      },
      {
        "title": "Module 4: Turning Work into Deliverables — Word, Excel & PowerPoint",
        "lectures": [
          ["Shape, Fill, Finish: get a usable file on the first try", 11],
          ["Create a real Word document", 11],
          ["Create an Excel spreadsheet with working formulas", 11],
          ["Create a PowerPoint deck", 11],
          ["What to check before sending any AI-generated file", 11]
        ]
      },
      {
        "title": "Module 5: Personalizing Claude — Projects, Memory & Skills",
        "lectures": [
          ["The blank-slate problem", 13],
          ["The Personalization Stack: Memory, Projects and Skills", 13],
          ["Hands-on: set up a Project, add a Memory fact, and build a Skill", 20],
          ["Which layer to use for which kind of context", 14]
        ]
      },
      {
        "title": "Module 6: Building Interactive Tools — Artifacts",
        "lectures": [
          ["From a document to something you can click", 12],
          ["The Build Loop: Spec, Build, Test, Iterate, Publish", 12],
          ["Write a clear spec for a tool", 12],
          ["Improve an existing Artifact without starting over", 12],
          ["Publish and share your tool", 12]
        ]
      },
      {
        "title": "Module 7: Claude as a Coding Partner — Claude Code",
        "lectures": [
          ["How Claude Code differs from everything else in Claude", 12],
          ["Install Claude Code step by step", 12],
          ["Spec, Build, Test, Document, Handoff", 12],
          ["How the approval system keeps you in control of your files", 12],
          ["Hands-on: build, test and document a working script", 17]
        ]
      },
      {
        "title": "Module 8: Delegating Work — Cowork",
        "lectures": [
          ["From approving each step to describing the outcome", 9],
          ["The Trust Ladder: Cowork's three permission modes, and why you start with Manual", 9],
          ["Hands-on: delegate a real multi-step task", 14],
          ["Global Instructions so you stop repeating context", 9],
          ["Using Connectors inside Cowork", 9],
          ["Scheduling tasks only after real testing", 10]
        ]
      },
      {
        "title": "Module 9: Claude as a Design Partner — Claude Design",
        "lectures": [
          ["Brief, Build, Draw, Test, Handoff", 10],
          ["Write a clear design brief", 10],
          ["Build a clickable prototype", 10],
          ["Use the Draw tool for precise changes", 10],
          ["Generate alternative designs before committing", 10],
          ["Hand off to Canva, Figma, HTML, PowerPoint or Claude Code", 10]
        ]
      },
      {
        "title": "Module 10: Designing Workflows & SOPs",
        "lectures": [
          ["Combine Connectors, Research and file creation into one weekly workflow", 15],
          ["Clarify, Design, Stress-Test, Document", 15],
          ["Find where a workflow could break before it does", 15],
          ["Turn a working workflow into a reusable Skill", 15]
        ]
      },
      {
        "title": "Module 11: Claude for Small Business",
        "lectures": [
          ["Install the Claude for Small Business plugin", 10],
          ["What's inside: ready-made business skills and tool connections (e.g. QuickBooks, PayPal)", 10],
          ["Run a skill with an approval step before anything is sent", 10],
          ["The Approval Tiers: Read, Prepare or Never Automate", 10],
          ["Hands-on: sort your own business tasks into tiers", 15]
        ]
      },
      {
        "title": "Module 12: Your Claude Mastery Recap",
        "lectures": [
          ["The 8-word summary of the whole course", 7],
          ["A quick-reference map of every framework", 7],
          ["Your complete Claude Work System: everything you built", 7],
          ["The one habit worth keeping", 7],
          ["Final knowledge check", 12]
        ]
      }
    ],
    "requirements": [
      "No coding experience needed",
      "A laptop or desktop computer (Windows or Mac)",
      "A Claude account. The free plan covers Chat, Projects, Artifacts and file creation",
      "A paid Claude plan (Pro or higher) is needed for Claude Code (Module 7), Cowork (Module 8) and Claude Design (Module 9)",
      "A Google account for the Google Drive Connector practice",
      "For Claude Code: Node.js 18 or higher (free; installation is covered), plus Git on Windows",
      "Claude desktop app (free download) for Cowork"
    ],
    "audience": [
      "People who already use Claude occasionally and want to use it properly",
      "Professionals who want to automate recurring reports, documents and research",
      "Small business owners who want Claude to handle routine business tasks safely",
      "Students who want a reliable system for research and coursework",
      "Freelancers and IT professionals who want to build tools, scripts and prototypes faster"
    ],
    "description": [
      "Still using Claude mainly for questions, emails and summaries? That's only the beginning.",
      "AI at work is moving beyond basic prompting. Claude can work with your real files, research with citations, create documents you can send, build tools you can click, write and test code, carry out multi-step tasks, and design prototypes. Most people never get past the chat box.",
      "This course teaches you to use Claude as a complete work system. In every module, you build something real and usable, not just practice exercises.",
      "Learn how to use Claude across:",
      "• Connectors",
      "• Research & Verification",
      "• Word, Excel & PowerPoint",
      "• Projects & Memory",
      "• Skills",
      "• Interactive Artifacts",
      "• Claude Code",
      "• Cowork & Delegation",
      "• Claude Design",
      "• Workflows & SOPs",
      "• Small-Business Workflows",
      "Each skill comes with a simple framework you can remember, real worked examples showing the exact prompt and result, and a hands-on task on your own work.",
      "The AI skill gap is changing. Knowing how to prompt is useful. Knowing how to put AI to work is the bigger skill.",
      "Don't wait until your workplace expects more from AI than basic chat. Go beyond prompting. Become AI-ready."
    ],
    "includes": [
      "12 modules, about 11 hours of learning",
      "80 lessons with click-by-click instructions",
      "26 worked prompt examples showing the exact prompt and the real result",
      "24 step-by-step setup guides",
      "11 hands-on \"Your turn\" tasks on your own real work",
      "55+ knowledge-check activities (multiple choice, ordering, fill-in-the-blanks and more)",
      "Easy-to-remember frameworks for every skill: Shape, Fill, Finish; the Build Loop; the Trust Ladder; and more",
      "Real examples for students, business owners, IT professionals and freelancers in every module",
      "A final recap with a quick-reference map of everything you learned",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "perplexity": {
    "subtitle": "Learn to research with Perplexity AI: ask sharper questions, check every source, go deeper with Pro Search and Deep Research, organise your work in Spaces, and turn your findings into shareable reports.",
    "learn": [
      "Understand how Perplexity differs from a search engine and from a regular AI chatbot",
      "Use the 4-step research loop on every question: Ask, Read, Verify, Refine",
      "Turn vague questions into strong research prompts with the 4-part structure: context, question, constraints, format",
      "Judge any source in seconds with the CARR check: Credibility, Authority, Recency, Relevance",
      "Confirm important facts by cross-checking several sources (triangulation)",
      "Choose the right search mode: Web, Academic, Pro Search or Deep Research",
      "Run multi-step Deep Research reports, and turn research directly into a presentation",
      "Upload your own documents, combine them with live web research, and compare two files side by side",
      "Organise recurring research in Spaces with custom instructions and files",
      "Publish your research as a formatted, shareable Page with citations",
      "Pick the right AI model (GPT, Claude, Gemini, Grok or Sonar) and use Model Council",
      "Use Comet, Perplexity's free AI browser, to work with any web page",
      "Research on the go with voice, camera and Memory",
      "Know Perplexity's limits, protect confidential information, and cite AI-assisted research properly"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Perplexity & When to Use It",
        "lectures": [
          ["Not a search engine, not just a chatbot", 7],
          ["Why citations matter more than they seem to", 6],
          ["When Perplexity is the right tool, and when something else fits better", 6],
          ["What's free before you pay for anything", 6]
        ]
      },
      {
        "title": "Module 2: Getting Started — Signup, Interface & Plans",
        "lectures": [
          ["Sign up step by step", 6],
          ["A tour of the screen: search bar, mode selector, sidebar, source panel", 6],
          ["Write and run your first research question", 6],
          ["Read the source panel properly", 6],
          ["Free vs Pro vs Max, with prices", 6]
        ]
      },
      {
        "title": "Module 3: The Core Research Loop",
        "lectures": [
          ["Ask, Read, Verify, Refine", 8],
          ["Tell a strong citation from a weak one", 8],
          ["Use follow-up questions to go deeper without starting over", 7],
          ["Know when a research thread is finished", 7]
        ]
      },
      {
        "title": "Module 4: Writing Powerful Research Prompts",
        "lectures": [
          ["Weak → Better → Strong: one real example", 7],
          ["The 4-part structure: context, question, constraints, format", 7],
          ["Three common mistakes and how to avoid them", 6],
          ["Hands-on: rewrite your own questions", 10]
        ]
      },
      {
        "title": "Module 5: Source Literacy — The Takxila Verification Framework",
        "lectures": [
          ["Seven kinds of sources: primary, secondary, official, academic, news, commercial, community", 8],
          ["The CARR check: your four-second source test", 8],
          ["Triangulation: when one citation isn't enough", 7],
          ["When this level of checking is really needed", 7]
        ]
      },
      {
        "title": "Module 6: Focus Modes — Web, Academic & Targeted Search",
        "lectures": [
          ["What Focus modes change", 7],
          ["Web mode as your default", 6],
          ["Academic mode for peer-reviewed sources", 6],
          ["Why you set Focus before asking", 6]
        ]
      },
      {
        "title": "Module 7: Pro Search — Deeper Multi-Source Investigation",
        "lectures": [
          ["What changes when Pro Search is on", 7],
          ["How many free Pro Searches you get each day", 6],
          ["When the extra depth is worth it", 6],
          ["The mistake of using Pro Search for everything", 6]
        ]
      },
      {
        "title": "Module 8: Deep Research & Deliverables",
        "lectures": [
          ["How Deep Research differs from Pro Search", 8],
          ["Run a full Deep Research report", 8],
          ["Turn research directly into a presentation with Deliverables", 7],
          ["Which plan Deep Research needs", 7]
        ]
      },
      {
        "title": "Module 9: Working with Files & Documents",
        "lectures": [
          ["Upload documents, images and PDFs", 8],
          ["What you can ask about an uploaded file", 8],
          ["Combine a file with live web research", 7],
          ["Compare two documents directly", 7]
        ]
      },
      {
        "title": "Module 10: Spaces — Organising Recurring Research",
        "lectures": [
          ["Set up a Space for a recurring need", 10],
          ["Custom instructions: set the rules once", 10],
          ["Add files every question can use", 10]
        ]
      },
      {
        "title": "Module 11: Pages — Publishing Research as a Shareable Document",
        "lectures": [
          ["Turn a research thread into a formatted Page", 7],
          ["When a Page is the right format", 6],
          ["Edit before you share", 6],
          ["Share with a public link, citations included", 6]
        ]
      },
      {
        "title": "Module 12: Choosing Your AI Model",
        "lectures": [
          ["What changes when you switch models", 7],
          ["Available models: Sonar, GPT, Claude, Gemini and Grok", 6],
          ["Model Council: compare several models at once", 6],
          ["When model choice really matters", 6]
        ]
      },
      {
        "title": "Module 13: Comet — Perplexity's Free AI Browser",
        "lectures": [
          ["What Comet is and how it differs from perplexity.ai", 6],
          ["The sidebar Assistant for any page you're viewing", 6],
          ["Multi-step tasks, not just questions", 6],
          ["What Comet Plus adds", 6],
          ["When a regular browser is still fine", 6]
        ]
      },
      {
        "title": "Module 14: Voice, Mobile & Memory",
        "lectures": [
          ["Turn on Memory and control what it remembers", 9],
          ["Ask questions by voice and camera on mobile", 8],
          ["Continue research between phone and computer", 8]
        ]
      },
      {
        "title": "Module 15: Combining Features into Workflows",
        "lectures": [
          ["A complete Deep Research + Spaces + Pages workflow", 8],
          ["Decision guide: which search depth?", 8],
          ["Decision guide: thread or Space?", 7],
          ["Decision guide: keep as a thread or turn into a Page?", 7]
        ]
      },
      {
        "title": "Module 16: Professional Use Cases",
        "lectures": [
          ["Research workflow: Student", 4],
          ["Research workflow: Job seeker", 4],
          ["Research workflow: Working professional", 4],
          ["Research workflow: Business owner", 4],
          ["Research workflow: Content creator", 4],
          ["Research workflow: Freelancer or consultant", 4],
          ["Hands-on: build a workflow for your own role", 6]
        ]
      },
      {
        "title": "Module 17: Responsible AI Research & Limitations",
        "lectures": [
          ["Perplexity's honest limitations", 7],
          ["When you need a qualified human", 6],
          ["Handling confidential information", 6],
          ["Citing AI-assisted research properly", 6]
        ]
      },
      {
        "title": "Module 18: Capstone — Build a Verified Research Brief",
        "lectures": [
          ["Phase 1: choose and frame your topic", 7],
          ["Phase 2: initial research and mode selection", 7],
          ["Phase 3: verify sources with CARR", 7],
          ["Phase 4: follow up and check for conflicting information", 6],
          ["Phase 5: bring in your own files", 6],
          ["Phase 6: organise and finalise", 6],
          ["Phase 7: final verification check", 6]
        ]
      },
      {
        "title": "Bonus: Perplexity Prompt Library",
        "lectures": [
          ["141 ready-to-use research prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No AI or research experience needed",
      "A computer or phone with a browser",
      "A free Perplexity account (Google, Apple, Microsoft or email sign-in)",
      "The free plan includes unlimited standard search with citations, about 5 Pro Searches a day, limited file uploads, Pages and the Comet browser",
      "Some modules use paid features: Deep Research (Module 8), full Spaces (Module 10) and model selection (Module 12) need Perplexity Pro. You can still follow those lessons without paying",
      "Optional: Comet browser (free download) for Module 13"
    ],
    "audience": [
      "Students who want faster, better-sourced research for assignments and projects",
      "Job seekers researching companies, roles and interviews",
      "Working professionals who need reliable information for reports and decisions",
      "Business owners researching markets, competitors and suppliers",
      "Content creators and freelancers who need accurate, citable facts"
    ],
    "description": [
      "Still doing research with 20 browser tabs open? There's a smarter way.",
      "Perplexity gives you researched answers with citations you can click and check. But getting reliable results takes more than typing a question. You need to ask well, read the sources, verify what matters, and know when to go deeper.",
      "This course teaches you to research with AI, not just ask it for answers.",
      "Learn how to:",
      "• Search smarter with strong research prompts",
      "• Work with sources and judge them quickly",
      "• Verify answers with the CARR check and triangulation",
      "• Ask better follow-up questions",
      "• Go deeper with Pro Search and Deep Research",
      "• Compare information and documents",
      "• Organise research in Spaces",
      "• Turn findings into shareable Pages and presentations",
      "• Work with any web page using the free Comet browser",
      "Ask → Read → Verify → Refine",
      "Every module includes practice prompts you run in Perplexity straight away, plus a \"Your turn\" task on your own research. The course ends with a capstone where you build a complete, verified research brief you can share.",
      "Don't just ask AI for an answer. Learn how to research with AI."
    ],
    "includes": [
      "18 modules, about 8 hours 40 minutes of learning (25–45 minutes per module)",
      "87 lessons explained in plain language",
      "28 guided practice prompts you run in Perplexity as you learn",
      "22 hands-on \"Your turn\" tasks on your own research questions",
      "Ready-made research workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: build a verified, shareable research brief",
      "Knowledge checks in every module",
      "A prompt library with 141 ready-to-use research prompts",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "deepseek": {
    "subtitle": "Learn to use DeepSeek, a free and capable AI tool, the right way: choose the right mode for each task, research current information, solve hard problems with step-by-step reasoning, and apply it to learning, business, marketing and coding.",
    "learn": [
      "Understand what DeepSeek is and how it differs from \"just another ChatGPT\"",
      "Use the Three Switches (Speed, Depth and Currency) to set up any question correctly",
      "Research current information with Search, and check answers with the Search Checklist",
      "Solve hard problems with Expert Mode and DeepThink, and read its reasoning to catch mistakes",
      "Break complex requests into steps with the Layer Stack, and get structured comparisons with the Comparison Grid",
      "Study hard topics properly, and create teaching material, with the Learning Loop",
      "Run business operations with the Business Loop: Listen, Create, Analyse, Improve",
      "Research markets and competitors with the Market Lens: Landscape, Audience, Position, Calendar",
      "Debug code in chat, and set up DeepSeek inside VS Code",
      "Analyse documents, spreadsheets and code files, and use Vision Mode for photos and handwriting",
      "Understand where your data is stored, and what you should never upload",
      "Check any AI use with the Four Guards: transparency, equity, responsibility and privacy",
      "Combine everything into your own weekly DeepSeek workflow"
    ],
    "sections": [
      {
        "title": "Module 1: Understanding DeepSeek",
        "lectures": [
          ["What DeepSeek is and how it's different", 9],
          ["The Three Switches: Speed (Instant/Expert), Depth (DeepThink) and Currency (Search)", 9],
          ["A tour of the current interface", 9],
          ["Hands-on: test all three switches on one question", 13]
        ]
      },
      {
        "title": "Module 2: Search & Research",
        "lectures": [
          ["Use the Search toggle for current information", 8],
          ["Where DeepSeek Search is strong, and where a dedicated research tool does better", 8],
          ["The Search Checklist: verify before you trust", 8],
          ["Combine Search with Speed and Depth", 8],
          ["Hands-on: run a search-grounded question", 13]
        ]
      },
      {
        "title": "Module 3: DeepThink & Expert Mode for Hard Problems",
        "lectures": [
          ["DeepSeek's biggest strength: deep reasoning at low cost", 13],
          ["The Reasoning Read: check the thinking, not just the final answer", 13],
          ["Solve a hard problem and spot where DeepSeek corrects itself", 12],
          ["When Expert Mode + DeepThink is overkill", 12]
        ]
      },
      {
        "title": "Module 4: Advanced Prompting — Layering & Comparison",
        "lectures": [
          ["The Layer Stack: break a big request into steps that build on each other", 11],
          ["The Comparison Grid: structured comparisons instead of vague summaries", 11],
          ["Combine both for complex decisions", 11],
          ["Hands-on: run a layered comparison", 17]
        ]
      },
      {
        "title": "Module 5: DeepSeek for Learning & Teaching",
        "lectures": [
          ["The Learning Loop: understand a topic instead of copying an answer", 11],
          ["A full worked example for teachers and coaches", 11],
          ["Use DeepThink for concepts that need deeper reasoning", 11],
          ["Hands-on: run a full Learning Loop", 17]
        ]
      },
      {
        "title": "Module 6: DeepSeek for Business Operations",
        "lectures": [
          ["The Business Loop: Listen, Create, Analyse, Improve", 12],
          ["One business taken through all four stages", 12],
          ["Use DeepThink and layered prompting for operational decisions", 12],
          ["Hands-on: run a Business Loop for your own work", 19]
        ]
      },
      {
        "title": "Module 7: DeepSeek for Marketing & Market Research",
        "lectures": [
          ["The Market Lens: Landscape, Audience, Position, Calendar", 12],
          ["Competitor research with the Comparison Grid and Search Checklist", 12],
          ["Use DeepThink for positioning and differentiation", 12],
          ["Hands-on: run the full Market Lens", 19]
        ]
      },
      {
        "title": "Module 8: DeepSeek for IT & Developers",
        "lectures": [
          ["Debug code in chat using the Reasoning Read", 11],
          ["Get a DeepSeek API key", 11],
          ["Set up DeepSeek in VS Code with the Continue extension", 11],
          ["When not to send code to DeepSeek (data residency)", 11],
          ["Hands-on: debug something real", 16]
        ]
      },
      {
        "title": "Module 9: Files, Documents & Vision Mode",
        "lectures": [
          ["Upload PDFs, Word files, spreadsheets and code", 11],
          ["Vision Mode for photos, screenshots and handwriting", 11],
          ["What to check before uploading sensitive files", 11],
          ["Hands-on: try both document and image analysis", 17]
        ]
      },
      {
        "title": "Module 10: Ethics & Responsible AI Use",
        "lectures": [
          ["The full data-residency picture", 13],
          ["The Four Guards: transparency, equity, responsibility and privacy", 13],
          ["What not to upload or ask, and why", 12],
          ["Verify before you act", 12]
        ]
      },
      {
        "title": "Module 11: Designing Your Own DeepSeek Workflow",
        "lectures": [
          ["The Workflow Build: Define, Assemble, Verify, Repeat", 11],
          ["Combine techniques from earlier modules into one routine", 11],
          ["Run the Four Guards on a whole workflow", 11],
          ["Hands-on: design your own weekly workflow", 17]
        ]
      },
      {
        "title": "Module 12: Your DeepSeek Mastery Recap",
        "lectures": [
          ["The 11-word summary, one word per module", 8],
          ["A quick-reference map of every framework", 8],
          ["Your complete DeepSeek toolkit", 8],
          ["The one habit worth keeping", 8],
          ["Final knowledge check", 8]
        ]
      }
    ],
    "requirements": [
      "No AI or coding experience needed",
      "A computer or phone with a browser",
      "DeepSeek is free to use at chat.deepseek.com, with sign-in by email, Google or Apple ID",
      "Optional, for developers (Module 8): VS Code (free) and a DeepSeek API key, which needs a small top-up of a few dollars",
      "Important: DeepSeek stores user data on servers in China. The course explains what this means and what you should never upload"
    ],
    "audience": [
      "Students who want help understanding hard topics, not just answers",
      "Teachers and coaches who want to prepare lessons and materials faster",
      "Business owners who want a free AI tool for operations and decisions",
      "Marketers who want faster competitor research and positioning",
      "IT professionals and developers who want a low-cost reasoning and coding assistant"
    ],
    "description": [
      "Your job may not change. But the speed and depth expected from you might.",
      "Research faster. Analyse faster. Compare options faster. Understand documents faster. Solve problems faster. AI is changing what can be done before the deadline arrives.",
      "So stop asking only, \"What answer can AI give me?\" Start asking, \"What problem can I solve with AI?\"",
      "DeepSeek is free, fast and capable, but it's also easy to use badly. This course teaches you to use it properly: the right mode for each task, the right way to check its answers, and the right situations to use it for.",
      "You follow Karan, who runs operations at a small business, as he builds his own DeepSeek workflow through the course.",
      "What you'll learn:",
      "• Search for current information",
      "• DeepThink and Expert Mode for hard problems",
      "• Research and verification",
      "• Advanced prompting: layering and comparison",
      "• Learning and teaching",
      "• Business operations",
      "• Marketing and market research",
      "• Coding and VS Code setup",
      "• Files, documents and Vision Mode",
      "• Responsible use and data privacy",
      "• Your own repeatable workflow",
      "Every module gives you a simple framework, real worked examples showing the exact prompt and result, and a hands-on task on your own work.",
      "Don't wait until deeper AI use becomes part of your job. Learn it before you're expected to know it."
    ],
    "includes": [
      "12 modules, about 10 hours of learning",
      "68 lessons with click-by-click instructions",
      "28 worked prompt examples showing the exact prompt and the real result",
      "11 hands-on \"Your turn\" tasks on your own work",
      "55+ knowledge-check activities (multiple choice, ordering, fill-in-the-blanks and more)",
      "A simple, memorable framework for every skill",
      "Real examples for students, teachers, business owners, marketers and IT professionals in every module",
      "A final recap with a quick-reference map",
      "Certificate of completion"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "lovable": {
    "subtitle": "Turn your ideas into live websites and MVPs, faster with AI: go from a first prompt to a published product, with no coding needed.",
    "learn": [
      "Understand what Lovable really is: a tool that writes real code (React, TypeScript and a Supabase database), not a drag-and-drop template builder",
      "Decide in minutes whether your idea suits Lovable, or whether a simpler website builder would be cheaper and easier",
      "Write a first prompt that names your exact sections, so the first version comes out close to what you want",
      "Check every build against what you asked for, and fix problems in small, safe steps",
      "Make four kinds of edits precisely (Style, Section, Layout and Content) without breaking the rest of your site",
      "Turn a Figma design or a screenshot into a working website, and add features the design didn't have",
      "Know the difference between Chat Connectors (help while you build) and App Connectors (features in your live site)",
      "Add real payments with Stripe, and connect services that aren't in Lovable's catalogue, such as an Indian UPI payment gateway, using their API documentation",
      "Write website copy that gets visitors to take one clear action, and add it without disturbing your design",
      "Publish your site live, connect your own domain, and update it safely after launch",
      "Save money with the free GitHub + Vercel/Netlify route instead of a paid custom-domain plan",
      "Recognise when a project has outgrown Lovable, and hand the real code to a developer without starting over"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Lovable, and When to Use It",
        "lectures": [
          ["Not a template picker: how Lovable writes real code, a database and user logins", 6],
          ["When Lovable fits best: startup MVPs, business tools with real logic, fast changes", 6],
          ["When it isn't the best choice: simple blogs, static pages, very complex logic", 7],
          ["How credits work, what the free plan includes and what paid plans add", 7],
          ["Framework: The Right Fit Check (Understand → Match → Flag → Start)", 7],
          ["Hands-on: run the Right Fit Check on your own idea", 7]
        ]
      },
      {
        "title": "Module 2: Your First Prompt",
        "lectures": [
          ["Sign up and start your first project", 6],
          ["Write a specific first prompt that names your sections", 6],
          ["The two-pane editor: chat on the left, live preview on the right", 6],
          ["Check the first version against what you asked for", 6],
          ["Why 2–3 changes at a time works better than one giant request", 6],
          ["Framework: The First Build (Describe → Watch → Check → Edit in Small Steps)", 6],
          ["Worked example: Ritika's portfolio, from first build to focused fix", 7],
          ["Hands-on: build and check the first version of your project", 7]
        ]
      },
      {
        "title": "Module 3: Editing Like You Mean It",
        "lectures": [
          ["Style edits: change colours and fonts across the whole site", 6],
          ["Section edits: add, remove or move a section exactly where you want", 7],
          ["Layout edits: rearrange items without changing the content", 7],
          ["Content edits: update only the words, not design or structure", 7],
          ["Say what should stay unchanged, so edits don't break other parts", 7],
          ["Framework: The Edit Menu (Style • Section • Layout • Content)", 7],
          ["Worked example: Takshika's theme, testimonials, layout and copy edits", 7],
          ["Hands-on: make one of each edit type on your project", 7]
        ]
      },
      {
        "title": "Module 4: Importing Designs",
        "lectures": [
          ["Paste a Figma link and turn it into a working website", 6],
          ["Use the Builder.io plugin for a more precise Figma conversion", 6],
          ["Upload a screenshot of a site you like as style inspiration", 6],
          ["The truth about \"cloning\" websites, and what actually works", 6],
          ["Add features a static design doesn't have, such as a contact form", 6],
          ["Compare the result with the original and fix the differences", 6],
          ["Framework: The Import Path (Capture → Choose the Method → Describe What's Different → Refine)", 6],
          ["Worked examples: Karan's Figma import and Ritika's screenshot inspiration", 6],
          ["Hands-on: import a real Figma design or screenshot", 7]
        ]
      },
      {
        "title": "Module 5: Lovable as Part of Your Toolkit — Integrations",
        "lectures": [
          ["Chat Connectors: give Lovable information while you build (Notion, design files, trackers)", 6],
          ["App Connectors: payments, email, CRM data and Slack notifications in your live site", 7],
          ["Custom API: connect services outside the catalogue using their API documentation", 7],
          ["Connecting tools doesn't use credits; only code generation does", 7],
          ["Check that each connection actually works", 7],
          ["Framework: Two Kinds of Connection (Chat Connectors • App Connectors • Custom API)", 7],
          ["Worked examples: a Notion spec, a Stripe deposit payment and a UPI payment gateway", 7],
          ["Hands-on: connect a real tool the right way for your project", 7]
        ]
      },
      {
        "title": "Module 6: Words That Convert — Website Copy",
        "lectures": [
          ["Decide the one action you want every visitor to take", 7],
          ["Draft copy in ChatGPT or Claude, then bring it into Lovable", 7],
          ["Replace generic lines with specific, concrete ones", 7],
          ["Add the finished copy as a Content edit, so your design stays untouched", 7],
          ["Framework: The Conversion Copy Check (Clarify the Goal → Draft with the Right Tool → Cut the Fluff → Integrate as Content)", 7],
          ["Worked example: Takshika's \"Reserve My Spot\" landing page copy", 7],
          ["Hands-on: write and add real conversion copy to your page", 8]
        ]
      },
      {
        "title": "Module 7: Publishing Your Site",
        "lectures": [
          ["Publish with the right audience: public, or limited to specific people", 6],
          ["Option 1: Lovable's built-in custom domain (paid plan)", 6],
          ["Option 2: free GitHub sync, then deploy on Vercel or Netlify", 6],
          ["Connect a domain step by step: A record, TXT record, automatic SSL", 6],
          ["Avoid a common mistake with domains behind Cloudflare or another CDN", 6],
          ["Update a live site safely with \"Publish changes\"", 6],
          ["Framework: The Launch Checklist (Publish First → Choose Your Domain Path → Connect → Update After Launch)", 6],
          ["Worked example: Karan compares the paid and free domain routes", 6],
          ["Hands-on: publish your project and choose your domain path", 7]
        ]
      },
      {
        "title": "Module 8: Real-World Fit — MVP Building & Growing Beyond",
        "lectures": [
          ["Where Lovable works best: MVPs, small business tools, event and programme sites", 6],
          ["Clear signs a project has outgrown Lovable", 7],
          ["Hand over the real code to developers through GitHub, with no lock-in", 7],
          ["Work with a designer: Figma import as the bridge to a working product", 7],
          ["Reassess fit as your project grows", 7],
          ["Framework: The Growth Signal (Recognise → Exit Cleanly → Collaborate → Reassess)", 7],
          ["Worked example: Karan exports his booking tool to GitHub for a development team", 7],
          ["Hands-on: reassess the fit of your own project", 7]
        ]
      },
      {
        "title": "Module 9: Your Lovable Mastery Recap",
        "lectures": [
          ["The 8-word journey: Fit → Build → Edit → Import → Connect → Convert → Publish → Grow", 7],
          ["A one-page quick-reference map of all 8 frameworks", 7],
          ["Your complete Lovable toolkit: everything you built", 7],
          ["The one habit worth keeping: check before you assume", 7],
          ["Final knowledge check", 7]
        ]
      }
    ],
    "requirements": [
      "No coding experience needed",
      "A computer with a modern browser",
      "A free Lovable account (sign up with email, Google, GitHub or Apple). The free plan includes daily credits, public projects and a free Lovable web address",
      "A paid Lovable plan is optional, needed only for a custom domain through Lovable and for private projects",
      "Optional free accounts: Figma (design import), GitHub (code sync and free hosting), Notion (build context)",
      "Optional: a Stripe account for the payments example",
      "Credit amounts and prices change often. Check Lovable's pricing page before buying a plan"
    ],
    "audience": [
      "Beginners who want to build websites with AI, without learning to code",
      "Entrepreneurs and startup founders who want to validate an idea with a working MVP",
      "Small business owners who want a website, booking tool or client portal of their own",
      "Freelancers exploring AI-powered website projects for clients",
      "Marketers creating landing pages and campaign pages quickly",
      "Coaches and trainers launching programme and workshop pages",
      "Students building portfolio websites",
      "Designers who want to turn Figma designs into working sites"
    ],
    "description": [
      "💡 Your idea deserves more than a notebook.",
      "Have a website idea, landing page concept or app idea but don't know how to build it? With Lovable, you can turn written instructions into working websites and apps without traditional coding.",
      "But generating a first draft is only the beginning.",
      "Most people stop at Lovable's first version, and it shows: placeholder text, sections in the wrong place, no payments, no domain, no visitors. Lovable Deep Dive takes you through the whole journey, from your first prompt to a published product real people can use.",
      "Inside the course:",
      "• ✍️ Prompting: turn ideas into clear instructions Lovable can build from",
      "• 🎨 Editing: change themes, sections, layouts and content without rebuilding",
      "• 🖼️ Importing: turn Figma designs and screenshots into working sites",
      "• 🔗 Integrations: connect Stripe, Notion, Slack and custom APIs",
      "• 💬 Conversion copy: write headlines and calls to action that get clicks",
      "• 🌐 Publishing: go live, connect your domain (including a free route) and update safely",
      "• 🛠️ MVP building: test your idea, and know when it's ready for the next step",
      "Your learning journey: Idea → Prompt → Build → Edit → Import → Connect → Publish → Grow",
      "What you'll build: by the end of the course, you'll have built and launched a real project of your own, such as:",
      "• A portfolio website with a projects showcase and a working contact form",
      "• A booking or client-intake tool with real logic and a Stripe deposit payment",
      "• A programme or workshop landing page with testimonials and a \"Reserve My Spot\" button",
      "• A working MVP to test your startup idea with real users",
      "You'll follow three learners throughout the course: Ritika, a business analytics student building her portfolio; Karan, a small business owner building a client booking tool; and Takshika, a trainer launching a leadership programme page.",
      "8 frameworks you'll master:",
      "• Right Fit Check: is Lovable right for this idea?",
      "• The First Build: get a strong first version",
      "• The Edit Menu: Style, Section, Layout, Content",
      "• The Import Path: from Figma or screenshot to working site",
      "• Two Kinds of Connection: Chat Connectors, App Connectors, Custom API",
      "• Conversion Copy Check: words that get clicks",
      "• Launch Checklist: publish, domain, update",
      "• Growth Signal: MVP to next stage",
      "Why this course is different:",
      "• Learn by doing. Every module ends with a hands-on task on your own project, so you finish with something real.",
      "• Real worked examples. See the exact prompt, what Lovable built, what went wrong, and how it was fixed.",
      "• Honest advice. Learn when Lovable isn't the right tool, how to save money on domains, and how to avoid common mistakes, so you don't waste credits.",
      "• No lock-in. Lovable writes real code, so you can always hand your project to a developer later.",
      "Don't stop at the first draft. A generated website is a starting point. Learn to refine it, make better decisions, test the experience and move toward a real launch.",
      "Start building. Keep improving. Launch your idea."
    ],
    "includes": [
      "9 modules, about 7.5 hours of learning",
      "47 short lessons with click-by-click instructions",
      "22 worked examples showing the exact prompt and what Lovable built",
      "8 hands-on \"Your turn\" tasks on your own website or app idea",
      "55+ knowledge-check activities (multiple choice, ordering, fill-in-the-blanks and more)",
      "8 easy-to-remember frameworks, one for each stage of building",
      "Real examples for students, small business owners, coaches and startup founders in every module",
      "Ready-to-adapt prompt templates for first builds, edits, imports, integrations and copy",
      "Honest guidance on credits, plans and costs, so you don't waste money",
      "A final recap with a one-page quick-reference map",
      "Certificate of completion"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "chatgpt-deep": {
    "subtitle": "Learn to use ChatGPT as a complete work system: Custom GPTs and Actions, connected Apps, Skills, consistent images, live websites and apps, ChatGPT Work, Codex, Deep Research and data analysis.",
    "learn": [
      "Write Custom GPT instructions that hold up in real use, and handle the four common ways GPTs fail",
      "Connect a Custom GPT to live outside data with Actions, safely and within its job",
      "Connect your tools (Google Drive, Notion, GitHub and more) with Apps, and build a daily or weekly brief",
      "Chain several apps together so one tool's output feeds the next, checking every handoff",
      "Understand when to use a Custom GPT, a Skill or a Project, and how they work together",
      "Create a matching set of images with a consistent character, product or brand look in ChatGPT Images 2.0",
      "Build and publish a real website with a live URL using ChatGPT Sites",
      "\"Vibe code\" interactive apps and games, and play-test them properly",
      "Hand off complete tasks to ChatGPT Work with a clear deliverable, the right files and safe permissions",
      "Delegate coding tasks to Codex, review changes before they merge, and schedule recurring jobs",
      "Scope Deep Research questions precisely and check the quality of every source",
      "Analyse data properly: find the real story behind averages, trace wrong numbers, and write an actionable findings brief"
    ],
    "sections": [
      {
        "title": "Module 1: Custom GPTs for Multi-Step Workflows",
        "lectures": [
          ["What a Custom GPT is, and who can currently create new ones", 9],
          ["The Custom GPT Backbone: Purpose, Routing, Test, Refine", 9],
          ["The four failure modes: missing input, contradictory input, scope creep and underflow", 9],
          ["Edit an existing GPT step by step", 9],
          ["Hands-on: apply the Backbone to your own GPT", 9]
        ]
      },
      {
        "title": "Module 2: Custom GPTs with Actions",
        "lectures": [
          ["What Actions do, and how they differ from Apps", 13],
          ["The Live Data Guard: connect outside data safely", 14],
          ["Handle unclear data, incomplete data and off-scope requests", 14],
          ["Set an access policy so a GPT stays within its job", 14]
        ]
      },
      {
        "title": "Module 3: Apps — Connecting Your Tools",
        "lectures": [
          ["Why \"connectors\" are now called Apps", 13],
          ["The Brief Builder: connect only what the task needs", 14],
          ["Set rules for combining several sources", 14],
          ["Hands-on: build a daily or weekly brief", 14]
        ]
      },
      {
        "title": "Module 4: Chaining Apps Together",
        "lectures": [
          ["The Handoff Chain: map, sequence, check, close the loop", 13],
          ["Make one app's output become the next app's input", 14],
          ["Check every handoff before trusting the result", 14],
          ["Hands-on: build and check a real chain", 14]
        ]
      },
      {
        "title": "Module 5: Skills — Reusable Capabilities",
        "lectures": [
          ["What a Skill is, and who currently has access", 12],
          ["Persona, Method or Workspace? Custom GPT vs Skill vs Project", 12],
          ["What makes a good Skill", 13],
          ["How the three work together", 13]
        ]
      },
      {
        "title": "Module 6: Consistent Visual Identity — ChatGPT Images 2.0",
        "lectures": [
          ["Generate images with ChatGPT Images 2.0", 11],
          ["The Style Lock: keep a character, product or brand consistent", 11],
          ["Catch and fix style drift", 11],
          ["Build a reusable reference sheet", 11],
          ["Hands-on: create a matching 3-image set", 11]
        ]
      },
      {
        "title": "Module 7: Build and Publish a Live Site — ChatGPT Sites",
        "lectures": [
          ["What ChatGPT Sites is, and where it's available", 11],
          ["Define audience, purpose and main action before building", 11],
          ["Refine in a private preview, then publish with the right audience", 11],
          ["What ChatGPT doesn't handle once a site is live", 11],
          ["Hands-on: build and publish a real site", 11]
        ]
      },
      {
        "title": "Module 8: Vibe Coding — Apps and Games",
        "lectures": [
          ["Build interactive apps and games with Sites", 13],
          ["Define rules and win/lose conditions before building", 14],
          ["The Play Test: test the logic, not just the look", 14],
          ["Hands-on: build and play-test your own app", 14]
        ]
      },
      {
        "title": "Module 9: ChatGPT Work",
        "lectures": [
          ["How Work mode differs from regular Chat", 11],
          ["The Work Order: define the deliverable, link files, verify the output", 11],
          ["Review permissions before granting access to sensitive files", 11],
          ["How Work compares to similar agent tools", 11],
          ["Hands-on: run a real Work task", 11]
        ]
      },
      {
        "title": "Module 10: Codex — Repeatable Workflows",
        "lectures": [
          ["What Codex does, and what belongs in Work instead", 11],
          ["The Repo Loop: delegate coding tasks with review before anything merges", 11],
          ["Codex's four access options: CLI, IDE extension, cloud and more", 11],
          ["Set up background or scheduled coding tasks", 11],
          ["Hands-on: run a scoped Codex task", 11]
        ]
      },
      {
        "title": "Module 11: Deep Research",
        "lectures": [
          ["Scope your research question precisely", 13],
          ["Access limits and usage caps", 14],
          ["The Source Check: judge source quality, not just count citations", 14],
          ["Turn findings into a structured, actionable brief", 14]
        ]
      },
      {
        "title": "Module 12: Data Analysis",
        "lectures": [
          ["Segment, Trace, Correlate Carefully, Brief", 12],
          ["Find the real story behind a misleading average", 12],
          ["Trace a wrong number to its root cause", 12],
          ["Chart relationships carefully: correlation isn't proof", 12],
          ["Hands-on: run a full data analysis", 12]
        ]
      },
      {
        "title": "Module 13: Your ChatGPT Mastery Recap",
        "lectures": [
          ["The 12-word summary, one word per module", 8],
          ["A quick-reference map of every framework", 8],
          ["The four corrections this course made, and why they matter", 8],
          ["The one habit worth keeping: verify", 8],
          ["Final knowledge check", 8]
        ]
      }
    ],
    "requirements": [
      "Some experience using ChatGPT; no coding needed for most modules",
      "A computer with a modern browser; the ChatGPT desktop app is recommended",
      "A paid ChatGPT plan (Plus or Pro) is recommended. Several features covered aren't available on Free or Go",
      "Plan and region limits to know before you buy:",
      "Creating new Custom GPTs: Team, Business or Enterprise accounts only (personal accounts can edit existing GPTs)",
      "Skills: Business, Enterprise and Edu workspaces only",
      "Sites: Plus, Pro and workspace plans only, not yet available in the EEA, Switzerland or the UK",
      "Deep Research and Codex usage depend on your plan",
      "Where you don't have access to a feature, each module gives you an alternative task"
    ],
    "audience": [
      "Professionals who already use ChatGPT and want to do much more with it",
      "Freelancers who want to build sites, tools and client deliverables faster",
      "Business owners who want connected workflows, briefs and automated tasks",
      "Analysts and managers who need research and data analysis they can trust",
      "Students and developers who want to build apps and use Codex"
    ],
    "description": [
      "Your job may not disappear. But the way you do it can change fast.",
      "Research is changing. Analysis is changing. Website creation is changing. Coding is changing. Content creation is changing. Connected workflows are changing. AI is moving beyond simply answering questions.",
      "So stop asking only, \"Can ChatGPT help me write this?\" Start asking, \"What else can I get done with ChatGPT?\"",
      "This course teaches you to use ChatGPT as a complete work system, building real, usable output in every module.",
      "Learn to:",
      "• 🛠️ BUILD Custom GPTs, live websites, apps and games",
      "• 🔗 CONNECT your tools with Apps and Actions, and chain them together",
      "• 🎨 CREATE consistent images for your brand",
      "• 💻 CODE with Codex, with proper review",
      "• 🔎 RESEARCH with Deep Research and source checks",
      "• 📊 ANALYSE data and find the real story",
      "• ⚡ AUTOMATE complete tasks with ChatGPT Work and scheduled jobs",
      "You learn alongside Karan, who runs operations at a small business, plus Ritika, a student, and Takshika, who designs training programmes, as they build real output with ChatGPT.",
      "Every module gives you a simple framework, real worked examples showing the exact prompt and result, and a hands-on task on your own work. The course also tells you honestly which features need which plan, so you know what you can use before you start.",
      "Don't wait until your manager, client or next role expects more than basic AI skills. Learn before you're expected to know it."
    ],
    "includes": [
      "13 modules, about 11.5 hours of learning",
      "61 lessons with click-by-click instructions",
      "43 worked prompt examples showing the exact prompt and the real result",
      "12 hands-on \"Your turn\" tasks on your own work",
      "80+ knowledge-check activities (multiple choice, ordering, fill-in-the-blanks and more)",
      "A simple, memorable framework for every skill",
      "Real examples for professionals, freelancers, students and business owners in every module",
      "A final recap with a quick-reference map",
      "Certificate of completion"
    ],
    "level": "Intermediate to Advanced",
    "language": "English"
  },
  "omni-basics": {
    "subtitle": "Direct cinematic AI videos with Gemini Omni, with consistent characters and products, controlled camera and lighting, layered sound and complete visual stories.",
    "learn": [
      "Write video prompts with the Director's Blueprint: Subject, Action, Setting and Style",
      "Direct camera movement on purpose with pan, dolly and tracking shots",
      "Set the mood with golden hour, soft window light, cinematic and neon lighting",
      "Turn still photos and product images into moving videos",
      "Direct sound: ambient audio, sound effects and dialogue, layered together",
      "Keep the same character or product consistent across multiple clips",
      "Use reference images to build a product video series",
      "Create smooth transitions with start and end frame control",
      "Plan multi-scene stories with storyboards and pacing",
      "Combine techniques quickly using three simple decision guides",
      "Use AI video responsibly, covering consent, honest labelling and copyright",
      "Direct and produce your own complete short video in the capstone"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Gemini Omni and When to Use It",
        "lectures": [
          ["How Omni differs from earlier video tools like Veo", 9],
          ["What \"intelligent\" video generation really means", 8],
          ["What Omni is good for, and what you need before you start", 8]
        ]
      },
      {
        "title": "Module 2: Getting Started: Access, Interface, First Video and Plans",
        "lectures": [
          ["Turning on Omni and a tour of the interface", 6],
          ["Generating a video from a plain-language prompt", 6],
          ["Refining it conversationally in the same session", 6],
          ["Google AI Plus, Pro and Ultra plans compared", 6],
          ["Practice: Generate and refine your first video", 6]
        ]
      },
      {
        "title": "Module 3: The Director's Blueprint",
        "lectures": [
          ["Why vague prompts give random results", 6],
          ["The four elements: Subject, Action, Setting and Style", 6],
          ["How style shapes the whole feeling of a video", 6],
          ["Practice: Build a complete blueprint prompt", 6],
          ["PART 2: CAMERA, LIGHT AND MOTION", 6]
        ]
      },
      {
        "title": "Module 4: Camera Movement: Pan, Dolly and Tracking Shots",
        "lectures": [
          ["Why camera movement changes how a video feels", 8],
          ["Directing pan, dolly and tracking shots", 8],
          ["Choosing the right movement for each scene", 7],
          ["Practice: Direct all three camera movements", 7]
        ]
      },
      {
        "title": "Module 5: Lighting and Mood",
        "lectures": [
          ["Golden hour, for example a misty tea plantation in Munnar at sunrise", 8],
          ["Soft window light and cinematic lighting", 8],
          ["Neon and other dramatic moods", 7],
          ["Practice: Light the same scene for different moods", 7]
        ]
      },
      {
        "title": "Module 6: Bringing Photos to Life: Image-to-Video",
        "lectures": [
          ["Directing specific motion instead of leaving it to chance", 8],
          ["Animating personal family photos thoughtfully", 8],
          ["Professional use: product photos into product videos", 7],
          ["Practice: Animate a photo of your own", 7]
        ]
      },
      {
        "title": "Module 7: Directing Sound: Ambient, Dialogue and Effects",
        "lectures": [
          ["Ambient sound, such as a busy Mumbai market at dusk", 6],
          ["Sound effects for action scenes", 6],
          ["Adding dialogue and layering several audio elements", 6],
          ["Practice: Direct a fully layered scene", 6],
          ["PART 3: CONSISTENCY AND STORYTELLING", 6]
        ]
      },
      {
        "title": "Module 8: Keeping Characters and Products Consistent",
        "lectures": [
          ["Why consistency matters for series, ads and brand content", 6],
          ["Keeping a character consistent by staying in the same session", 6],
          ["Using reference images for a product video series", 6],
          ["What makes a strong reference image", 6],
          ["Practice: Build a consistent video series", 6]
        ]
      },
      {
        "title": "Module 9: Transitions with Start and End Frames",
        "lectures": [
          ["Directing a transition from a start frame", 7],
          ["Controlling exactly where a video ends", 6],
          ["Why frame control matters for multi-clip work", 6],
          ["Practice: Direct a smooth transition", 6]
        ]
      },
      {
        "title": "Module 10: Storyboards and Pacing",
        "lectures": [
          ["Asking Gemini for a storyboard", 8],
          ["Controlling total video length across scenes", 8],
          ["Combining scenes into one coherent sequence, with notes on audio", 7],
          ["Practice: Plan and generate a multi-scene story", 7]
        ]
      },
      {
        "title": "Module 11: Combining Features Into Real Workflows",
        "lectures": [
          ["Decision Guide 1: start from text or from an image?", 6],
          ["Decision Guide 2: which camera and lighting?", 6],
          ["Decision Guide 3: a single clip or a planned sequence?", 6],
          ["Practice: Apply all three guides to one video", 6],
          ["PART 4: APPLY, STAY SAFE AND PRODUCE", 6]
        ]
      },
      {
        "title": "Module 12: Professional Use Cases",
        "lectures": [
          ["Student, job seeker, working professional, business owner, content creator and freelancer", 15],
          ["Practice: Build a directed video for your own role", 15]
        ]
      },
      {
        "title": "Module 13: Responsible Use and Safety",
        "lectures": [
          ["Omni's real limitations", 7],
          ["Getting consent before showing a real person", 6],
          ["Avoiding misleading content and labelling AI video honestly", 6],
          ["Copyright checks before commercial use", 6]
        ]
      },
      {
        "title": "Module 14: Capstone: Direct and Produce a Real Short Video",
        "lectures": [
          ["7 phases: story planning, first scene, camera and lighting, sound, consistency, transitions and final review", 23],
          ["Use at least six techniques from the course in one connected workflow", 22]
        ]
      },
      {
        "title": "Module 15: Gemini Omni Prompt Library",
        "lectures": [
          ["67 ready-to-use video prompts in 15 categories", 5]
        ]
      }
    ],
    "requirements": [
      "No video or editing experience needed",
      "A computer or phone with internet access",
      "A paid Google AI plan (Plus, Pro or Ultra) to use Gemini Omni",
      "Optional: your own photos or product images to animate"
    ],
    "audience": [
      "Content creators who want scroll-stopping Reels and Shorts",
      "Business owners who want product videos and ads without a video team",
      "Marketers who need consistent brand videos and campaign series",
      "Students and job seekers who want a creative portfolio",
      "Freelancers who want to offer AI video services to clients",
      "Anyone curious about directing AI video properly"
    ],
    "description": [
      "Great AI video. But can you direct it, and keep it consistent?",
      "Anyone can type a prompt and get a random clip. Creators who get results know how to direct: where the camera moves, how the light falls, what the audience hears, and how to keep the same character or product looking the same from one clip to the next.",
      "This course teaches you that skill with Google's Gemini Omni. You start by generating your first video in Module 2. Then you learn the Director's Blueprint, a simple four-part prompt structure that turns vague ideas into controlled scenes.",
      "From there you build your directing toolkit one technique at a time: camera movement, lighting and mood, image-to-video, layered sound, character and product consistency, transitions and storyboarding.",
      "Every practice prompt comes with a worked example, from a dosa vendor in a busy Mumbai market to a misty tea plantation in Munnar, so you see exactly how a well-directed prompt is written before you write your own.",
      "In the capstone you plan, direct and produce your own complete short video, ready for Reels, ads, your brand or your portfolio.",
      "Stop generating random clips. Start directing videos."
    ],
    "includes": [
      "7 hours of guided, hands-on lessons",
      "15 modules: 14 core modules plus a prompt library",
      "33 guided video prompts, each with a ready-made example to try",
      "19 practice tasks built around your own videos",
      "24 quiz checks to confirm your understanding",
      "67 ready-to-use prompts across 15 categories",
      "A 7-phase capstone where you produce a complete short video",
      "Certificate of completion",
      "Access on mobile and desktop",
      "Access for 20 days"
    ],
    "level": "Beginner to Advanced",
    "language": "English"
  },
  "mj-entry": {
    "subtitle": "Learn Midjourney V8.1 step by step: write precise prompts, control framing and light, adjust style, build your own visual look, keep characters consistent, refine without restarting, and turn images into short videos.",
    "learn": [
      "Understand what Midjourney is, what's new in V8.1, and when to use it",
      "Find your way around the Midjourney web app and use Vary Subtle, Vary Strong and Animate",
      "Structure prompts with subject, setting and specific detail, and avoid common mistakes",
      "Control the frame with aspect ratio and camera viewpoint",
      "Direct light: its direction, shadows and intensity",
      "Fine-tune results with Raw mode, Stylization and Weirdness",
      "Train personalization profiles and build moodboards that reflect your taste",
      "Create and reuse your own style with Style Creator and style references",
      "Explore ideas fast with Draft Mode, and get native 2K HD images",
      "Test several creative directions at once with Permutations",
      "Keep the same character across different scenes with Omni Reference",
      "Refine images with Remix instead of starting over",
      "Animate still images into short video clips, up to about 21 seconds",
      "Use AI images responsibly: consent, honest labelling and copyright"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Midjourney & When to Use It",
        "lectures": [
          ["What Midjourney is, in plain words", 7],
          ["What's new in the V8.1 model", 6],
          ["When to use Midjourney over other tools", 6],
          ["What you need before your first image", 6]
        ]
      },
      {
        "title": "Module 2: Getting Started: Interface, First Image & Plans",
        "lectures": [
          ["The three main areas of the web app", 8],
          ["Generate your first image and read the four-image grid", 8],
          ["Vary Subtle, Vary Strong and Animate", 7],
          ["The four plans compared: Basic, Standard, Pro, Mega", 7]
        ]
      },
      {
        "title": "Module 3: Prompting Fundamentals",
        "lectures": [
          ["Prompt structure: subject, setting and detail", 8],
          ["Replace vague words with specific ones", 8],
          ["Why \"no\" instructions can add the thing you don't want", 7],
          ["Fix a prompt that gave an unexpected result", 7]
        ]
      },
      {
        "title": "Module 4: Composition: Aspect Ratio & Viewpoint",
        "lectures": [
          ["Choose the right aspect ratio for where the image will be used", 8],
          ["Compare one prompt across different aspect ratios", 8],
          ["Direct the camera viewpoint", 7],
          ["How viewpoint changes the emotion of an image", 7]
        ]
      },
      {
        "title": "Module 5: Lighting: Direction, Shadows & Intensity",
        "lectures": [
          ["Direct where the light comes from", 8],
          ["Control shadow contrast and length", 8],
          ["Set light intensity for different moods", 7],
          ["Combine lighting with subject and setting", 7]
        ]
      },
      {
        "title": "Module 6: Parameters: Raw Mode, Stylization & Weirdness",
        "lectures": [
          ["Raw mode for literal, less stylised results", 8],
          ["Stylization: how much artistic interpretation to apply", 8],
          ["Weirdness: push toward unusual results", 7],
          ["How these settings work with personalization", 7]
        ]
      },
      {
        "title": "Module 7: Personalization: Profiles & Moodboards",
        "lectures": [
          ["Why personalization matters more in V8.1", 8],
          ["Train a profile by rating images", 8],
          ["Separate profiles for different projects", 7],
          ["Build a moodboard to guide a project's look", 7]
        ]
      },
      {
        "title": "Module 8: Style References",
        "lectures": [
          ["Build a custom style with Style Creator", 8],
          ["Apply a style reference to a new prompt", 8],
          ["Reuse a style across a new project", 7],
          ["Style references are now stable in V8.1", 7]
        ]
      },
      {
        "title": "Module 9: Draft Mode & HD",
        "lectures": [
          ["How Draft Mode's role has changed in V8.1", 7],
          ["Explore ideas quickly and cheaply", 6],
          ["Native 2K HD as the default", 6],
          ["Choose the right speed vs quality trade-off", 6]
        ]
      },
      {
        "title": "Module 10: Permutations: Test Several Directions at Once",
        "lectures": [
          ["What Permutations do", 7],
          ["Build a permutation prompt", 6],
          ["Read the result grid", 6],
          ["Pick variables worth testing", 6]
        ]
      },
      {
        "title": "Module 11: Character Consistency: Omni Reference",
        "lectures": [
          ["Set up a character as a reference", 8],
          ["Reuse the same character in different scenes", 8],
          ["Adjust reference weight to protect the character's identity", 7],
          ["Build a consistent character series for stories", 7]
        ]
      },
      {
        "title": "Module 12: Remix & Iterative Refinement",
        "lectures": [
          ["Edit the prompt behind an existing image with Remix", 7],
          ["When Remix beats starting over", 6],
          ["Run a deliberate second pass", 6],
          ["Build a habit of refining, not one-shot generating", 6]
        ]
      },
      {
        "title": "Module 13: Image to Video",
        "lectures": [
          ["Animate a still image into a short clip", 9],
          ["Extend a clip up to about 21 seconds", 8],
          ["What works well, and current limits", 8]
        ]
      },
      {
        "title": "Module 14: Combining Features into Workflows",
        "lectures": [
          ["Decision guide: explore fast or commit to full quality?", 8],
          ["Decision guide: one-off image or consistent series?", 8],
          ["Decision guide: still or moving?", 7],
          ["Chain several features into one project", 7]
        ]
      },
      {
        "title": "Module 15: Professional Use Cases",
        "lectures": [
          ["Student workflow", 5],
          ["Job seeker workflow", 5],
          ["Working professional workflow", 5],
          ["Business owner workflow", 5],
          ["Content creator workflow", 5],
          ["Freelancer or consultant workflow", 5]
        ]
      },
      {
        "title": "Module 16: Responsible Use & Safety",
        "lectures": [
          ["Midjourney's honest limitations", 7],
          ["Consent before showing a real person", 6],
          ["Avoiding misleading images, and labelling AI content", 6],
          ["Copyright before commercial use", 6]
        ]
      },
      {
        "title": "Module 17: Capstone: Design a Visual Campaign",
        "lectures": [
          ["Phase 1: frame your campaign", 7],
          ["Phase 2: explore with Draft Mode", 7],
          ["Phase 3: direct composition and lighting", 7],
          ["Phase 4: set a consistent style", 6],
          ["Phase 5: refine through iteration", 6],
          ["Phase 6: add motion", 6],
          ["Phase 7: final check and responsible review", 6]
        ]
      },
      {
        "title": "Bonus: Midjourney Prompt Library",
        "lectures": [
          ["65 ready-to-use prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No art, design or AI experience needed",
      "A computer or phone with a modern browser",
      "A paid Midjourney subscription. Midjourney has no free plan; plans start with Basic at about US$10/month",
      "Check Midjourney's current pricing before subscribing, as it can change"
    ],
    "audience": [
      "Complete beginners who want to create AI images with real control",
      "Content creators who want striking visuals and consistent characters for their channels",
      "Small business owners who want product and campaign images without a photoshoot",
      "Marketers who need on-brand visuals quickly",
      "Students and job seekers who want a creative portfolio project"
    ],
    "description": [
      "Not just prompts. This is what you'll actually control.",
      "Anyone can generate an AI image. Can you control the result? Stop hoping for a great generation, and learn how to direct one.",
      "What you'll control:",
      "• Prompts: structure, precision and common pitfalls",
      "• The frame: composition, aspect ratio and viewpoint",
      "• The light: direction, shadows and intensity",
      "• The output: Raw mode, Stylization and Weirdness",
      "• Your visual style: personalization, profiles, moodboards and style references",
      "• Faster exploration: Draft Mode, HD and Permutations",
      "• Consistent characters: Omni Reference for stories and visual series",
      "• Refinement: Remix and iterative improvement",
      "• Motion: image-to-video",
      "• Real work: combined workflows, professional use cases and responsible creation",
      "Prompt → Compose → Light → Style → Control → Consistency → Refine → Animate",
      "Every module includes practice prompts you run in Midjourney straight away, plus a \"Your turn\" task. The course ends with a capstone where you design and produce your own complete visual campaign.",
      "Stop hoping for a great generation. Learn how to direct one."
    ],
    "includes": [
      "17 modules, about 8 hours of learning (25–45 minutes per module)",
      "68 lessons explained in plain language",
      "41 guided Midjourney prompts you run as you learn",
      "22 hands-on \"Your turn\" tasks",
      "Ready-made creative workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: design and produce your own visual campaign",
      "Knowledge checks in every module",
      "A prompt library with 65 ready-to-use Midjourney prompts",
      "Certificate of completion"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "kling-basics": {
    "subtitle": "Learn Kling AI from the ground up: write directed prompts with the 5W1H formula, generate images and videos, control the camera and motion, build talking AI avatars, and bring it all together in Kling Canvas.",
    "learn": [
      "Understand what Kling AI is: one platform for images, video and AI avatars",
      "Find your way around Kling's sidebar and top bar, and create your first image and video",
      "Write directed prompts with Kling's 5W1H formula (who, what, where, when, why, how)",
      "Turn rough ideas into professional prompts with DeepSeek, built into Kling, and use the Inspiration Word Bank",
      "Generate images and variations for real professional uses",
      "Edit images without starting over, apply style transfer, and keep a logo or brand element consistent",
      "Create videos two ways, from text and from an image, and control duration and shot type",
      "Direct shot types and camera movement like a filmmaker",
      "Use Motion Control for precise camera paths, speed and movement copied from a reference video",
      "Build a talking AI avatar from a photo and a script, with accurate lip-sync, in videos up to 5 minutes",
      "Combine images and video clips in one project with Kling Canvas",
      "Use AI video responsibly: consent, honest labelling and commercial use"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Kling AI & When to Use It",
        "lectures": [
          ["What Kling AI is, in plain words", 7],
          ["One platform, three outputs: images, video and avatars", 6],
          ["When Kling is the right choice", 6],
          ["What you need before you start", 6]
        ]
      },
      {
        "title": "Module 2: Getting Started: Interface, First Image & Plans",
        "lectures": [
          ["The five sidebar items and five top-bar tools", 8],
          ["Generate your first image", 8],
          ["Turn that image into your first video", 7],
          ["How to check current pricing before choosing a plan", 7]
        ]
      },
      {
        "title": "Module 3: Prompting Fundamentals: The 5W1H Formula",
        "lectures": [
          ["Why a bare prompt leaves results to chance", 8],
          ["Build a prompt with 5W1H: who, what, where, when, why, how", 8],
          ["Rebuild a vague prompt into a fully directed one", 7],
          ["Use the formula flexibly, not rigidly", 7]
        ]
      },
      {
        "title": "Module 4: DeepSeek Inside Kling: AI-Assisted Prompting",
        "lectures": [
          ["What the built-in DeepSeek assistant does", 7],
          ["Turn a rough idea into a professional prompt", 6],
          ["The Inspiration Word Bank for fine creative control", 6],
          ["When writing your own prompt is still better", 6]
        ]
      },
      {
        "title": "Module 5: Image Generation",
        "lectures": [
          ["Generate an image with a complete 5W1H prompt", 8],
          ["Create several variations from one prompt", 8],
          ["Images for real professional uses", 7],
          ["When to refine vs start a new prompt", 7]
        ]
      },
      {
        "title": "Module 6: Editing & Style Transfer",
        "lectures": [
          ["Make targeted edits without regenerating", 8],
          ["Change an image's visual style with style transfer", 8],
          ["Keep a logo or brand element consistent across edits", 7],
          ["When an edit beats a fresh prompt", 7]
        ]
      },
      {
        "title": "Module 7: Video Generation: Two Ways into a Video",
        "lectures": [
          ["Text-to-video", 8],
          ["Image-to-video", 8],
          ["When to use each", 7],
          ["Control duration and shot type", 7]
        ]
      },
      {
        "title": "Module 8: Camera & Shot Control",
        "lectures": [
          ["Shot types: close-up, medium, wide and more", 7],
          ["Camera movement within a video", 6],
          ["Combine shot type and movement in one request", 6],
          ["How camera choices shape the viewer's experience", 6]
        ]
      },
      {
        "title": "Module 9: Motion Control: Precise, Directed Movement",
        "lectures": [
          ["How Motion Control differs from standard video generation", 8],
          ["Direct exact camera path and speed", 8],
          ["Copy movement from a reference video", 7],
          ["When Motion Control is worth the extra setup", 7]
        ]
      },
      {
        "title": "Module 10: Building AI Avatars: Photo, Script & Speech",
        "lectures": [
          ["What Avatar 2.0 does: videos up to 5 minutes", 6],
          ["Build an avatar from a photo and a script", 6],
          ["Add speech with accurate lip-sync", 6],
          ["What to know about multilingual delivery", 6],
          ["A consistent, reusable presenter for multiple videos", 6]
        ]
      },
      {
        "title": "Module 11: Kling Canvas: Multi-Layer Creative Workspace",
        "lectures": [
          ["What Canvas solves", 7],
          ["Combine several generated assets in one project", 6],
          ["Arrange images and video clips together", 6],
          ["When a project needs Canvas", 6]
        ]
      },
      {
        "title": "Module 12: Combining Features into Workflows",
        "lectures": [
          ["Decision guide: image first, or straight to video?", 8],
          ["Decision guide: standard direction or Motion Control?", 8],
          ["Decision guide: single asset or Canvas project?", 7],
          ["Chain several features into one project", 7]
        ]
      },
      {
        "title": "Module 13: Professional Use Cases",
        "lectures": [
          ["Student workflow", 5],
          ["Job seeker workflow", 5],
          ["Working professional workflow", 5],
          ["Business owner workflow", 5],
          ["Content creator workflow", 5],
          ["Freelancer or consultant workflow", 5]
        ]
      },
      {
        "title": "Module 14: Responsible Use & Safety",
        "lectures": [
          ["Kling's honest limitations", 7],
          ["Consent before building an avatar of a real person", 6],
          ["Avoiding misleading content, and labelling AI content", 6],
          ["Commercial-use considerations", 6]
        ]
      },
      {
        "title": "Module 15: Capstone: Produce a Campaign or Story",
        "lectures": [
          ["Phase 1: frame your project", 7],
          ["Phase 2: explore with images", 7],
          ["Phase 3: refine with editing or style transfer", 7],
          ["Phase 4: produce the video", 6],
          ["Phase 5: add Motion Control or an avatar", 6],
          ["Phase 6: organise everything in Canvas", 6],
          ["Phase 7: final check and responsible review", 6]
        ]
      },
      {
        "title": "Bonus: Kling AI Prompt Library",
        "lectures": [
          ["68 ready-to-use prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No video, design or AI experience needed",
      "A computer with a modern browser (Kling runs in the browser, no download needed)",
      "A Kling AI account",
      "Kling's pricing changes often. Check the current plans on klingai.com before choosing one"
    ],
    "audience": [
      "Beginners who want to start creating AI video",
      "Content creators making Reels, Shorts and social videos",
      "Small business owners who want product videos and ads without a film crew",
      "Marketers who need video content and AI presenters quickly",
      "Students and job seekers who want creative portfolio projects"
    ],
    "description": [
      "Still creating static AI images? Make them move.",
      "Anyone can generate an AI image. Can you bring it to life? Kling AI lets you create images, turn them into cinematic video, direct the camera, and even build an AI presenter who speaks your script, all on one platform.",
      "This course takes you from your first prompt to a finished multi-asset project.",
      "What you'll learn:",
      "• Prompt with direction: the 5W1H formula, with DeepSeek built in",
      "• Create and refine images: generation, editing, style transfer",
      "• Turn ideas into video: text-to-video and image-to-video",
      "• Think like a director: shot types and camera movement",
      "• Control motion precisely: camera paths, speed and reference movement",
      "• Build AI avatars: photo + script + lip-synced speech",
      "• Bring it together: Kling Canvas",
      "• Create content that moves: social ads, product videos, Reels, brand content",
      "Idea → Prompt → Image → Video → Camera → Motion → Avatar → Final project",
      "Every module includes practice prompts you run in Kling straight away, plus a \"Your turn\" task. The course ends with a capstone where you produce your own campaign or story.",
      "Don't stop at the frame. Bring it to life."
    ],
    "includes": [
      "15 modules, about 7 hours 20 minutes of learning (25–45 minutes per module)",
      "69 lessons explained in plain language",
      "32 guided Kling prompts you run as you learn",
      "20 hands-on \"Your turn\" tasks",
      "Ready-made video workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: produce your own campaign or story",
      "Knowledge checks in every module",
      "A prompt library with 68 ready-to-use Kling prompts",
      "Certificate of completion"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "canva-ai": {
    "subtitle": "Learn Canva AI 2.0, Canva's new conversational design assistant: describe your idea and get a finished design, keep it on-brand, create videos and copy, and launch a complete campaign from one conversation.",
    "learn": [
      "Understand what Canva AI 2.0 is, and how it differs from the older Canva AI 1.0",
      "Create designs by describing your goal, instead of searching through templates",
      "Refine designs through back-and-forth conversation",
      "Change one element precisely without affecting the rest of the design (object-based editing)",
      "Generate and refine images in the style and aspect ratio you choose",
      "Teach Canva AI your style with the Memory Library and an \"About Me\" profile",
      "Keep every design on-brand automatically with Brand Intelligence, and update old designs to a refreshed brand",
      "Create a complete multi-piece campaign from one conversation (agentic orchestration)",
      "Turn a meeting transcript or content from connected apps into a finished design",
      "Ground designs in current facts with Web Research, including scheduled background research",
      "Generate video from text, animate still images, and add AI voiceovers",
      "Write, brainstorm and rewrite copy with Magic Write",
      "Build interactive elements (quizzes, calculators and more) with Canva Code 2.0, no coding needed",
      "Turn spreadsheet data into visuals with Sheets AI, and schedule recurring tasks",
      "Use Canva AI responsibly: consent, labelling and data privacy"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Canva AI & When to Use It",
        "lectures": [
          ["Canva AI: a creative partner built into the editor", 7],
          ["Canva AI 1.0 vs 2.0: the honest difference", 6],
          ["Which plans get which features", 6],
          ["When Canva AI is the right choice", 6]
        ]
      },
      {
        "title": "Module 2: Getting Started: The Conversational Interface",
        "lectures": [
          ["A tour of the Canva AI chat interface", 8],
          ["Generate your first design from a plain description", 8],
          ["Attach files to give Canva AI more context", 7],
          ["Return to past conversations", 7]
        ]
      },
      {
        "title": "Module 3: Conversational Design: Ideas, Not Templates",
        "lectures": [
          ["Describe your goal instead of a layout", 10],
          ["Refine through back-and-forth conversation", 10],
          ["Why describing intent gets better results", 10]
        ]
      },
      {
        "title": "Module 4: Object-Based Editing",
        "lectures": [
          ["Every generated element stays individually editable", 9],
          ["Change one element without affecting the rest", 8],
          ["Collaborate on a design mid-edit", 8]
        ]
      },
      {
        "title": "Module 5: Image Generation & Refinement",
        "lectures": [
          ["Generate standalone images with a chosen style and aspect ratio", 8],
          ["Refine by adding detail in conversation", 8],
          ["Use Canva AI's own suggestions to improve results", 7],
          ["Image mode vs full design generation", 7]
        ]
      },
      {
        "title": "Module 6: The Memory Library: Teaching Canva AI Your Style",
        "lectures": [
          ["What the Memory Library does", 8],
          ["Personalise Canva AI with your existing designs", 8],
          ["Build an \"About Me\" profile", 7],
          ["Update it without starting over", 7]
        ]
      },
      {
        "title": "Module 7: Brand Intelligence: Every Design On-Brand",
        "lectures": [
          ["Apply your brand automatically to new designs", 9],
          ["Update existing work to a refreshed brand", 8],
          ["Connect brand data instead of describing it each time", 8]
        ]
      },
      {
        "title": "Module 8: Agentic Orchestration: One Conversation, a Complete Campaign",
        "lectures": [
          ["Describe a multi-part goal and let Canva AI coordinate the tools", 10],
          ["Turn a rough sketch or brief into finished designs", 10],
          ["When orchestration is worth it", 10]
        ]
      },
      {
        "title": "Module 9: Connectors: Bringing In Your Real Work",
        "lectures": [
          ["What Connectors do", 7],
          ["Turn a meeting transcript into a finished design", 6],
          ["Pull content from a connected app into a new design", 6],
          ["Which connections are supported", 6]
        ]
      },
      {
        "title": "Module 10: Web Research: Designs Grounded in Current Facts",
        "lectures": [
          ["Research on demand inside a design request", 9],
          ["Schedule background research for ongoing needs", 8],
          ["When Web Research is worth the extra step", 8]
        ]
      },
      {
        "title": "Module 11: Video & Motion Generation",
        "lectures": [
          ["Generate a short video from a text description", 8],
          ["Add setting and tone to shape the clip", 8],
          ["Animate an existing still image", 7],
          ["Add an AI voiceover", 7]
        ]
      },
      {
        "title": "Module 12: Writing Tools: Magic Write & Conversational Copy",
        "lectures": [
          ["Generate copy from a plain description", 8],
          ["Set tone and length", 8],
          ["Brainstorm ideas with Magic Write", 7],
          ["Rewrite copy into a different format", 7]
        ]
      },
      {
        "title": "Module 13: Canva Code 2.0: Interactive Elements",
        "lectures": [
          ["Build interactive elements from a description, with no coding", 8],
          ["Refine them through conversation", 8],
          ["Start from ready-made templates", 7],
          ["Share and publish", 7]
        ]
      },
      {
        "title": "Module 14: Sheets AI & Scheduling",
        "lectures": [
          ["Work with spreadsheet data inside Canva", 7],
          ["Turn data into a visual design", 6],
          ["Schedule a recurring Canva AI task", 6],
          ["When automation is worth setting up", 6]
        ]
      },
      {
        "title": "Module 15: Combining Features into Workflows",
        "lectures": [
          ["Decision guide: new idea or existing context?", 8],
          ["Decision guide: one output or a coordinated set?", 8],
          ["Decision guide: one-off or recurring?", 7],
          ["Chain several features into one project", 7]
        ]
      },
      {
        "title": "Module 16: Professional Use Cases",
        "lectures": [
          ["Student workflow", 5],
          ["Job seeker workflow", 5],
          ["Working professional workflow", 5],
          ["Business owner workflow", 5],
          ["Content creator workflow", 5],
          ["Freelancer or consultant workflow", 5]
        ]
      },
      {
        "title": "Module 17: Responsible Use & Safety",
        "lectures": [
          ["Canva AI's honest limitations", 7],
          ["Consent before showing a real person", 6],
          ["How Canva labels AI-generated content", 6],
          ["Data considerations when connecting accounts", 6]
        ]
      },
      {
        "title": "Module 18: Capstone: Launch a Campaign from One Conversation",
        "lectures": [
          ["Phase 1: frame your campaign", 7],
          ["Phase 2: ground it in real context", 7],
          ["Phase 3: build the coordinated set", 7],
          ["Phase 4: apply your brand", 6],
          ["Phase 5: refine through conversation", 6],
          ["Phase 6: add motion or automation", 6],
          ["Phase 7: final check and responsible review", 6]
        ]
      },
      {
        "title": "Bonus: Canva AI Prompt Library",
        "lectures": [
          ["60 ready-to-use prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No design experience needed",
      "A computer with a modern browser",
      "A Canva account",
      "A paid Canva plan (Pro, Teams, Business or Nonprofit) is needed for full Canva AI 2.0 features, including the Memory Library and Connectors",
      "Canva Free and Education plans get Canva AI 1.0 only, with limited monthly use of Magic Write and Background Remover. You can follow the lessons, but not every feature will be available"
    ],
    "audience": [
      "Canva users who want to move beyond templates to AI-powered design",
      "Small business owners who want on-brand social posts, flyers and campaigns fast",
      "Content creators producing visuals and short videos regularly",
      "Marketers who need coordinated campaign assets quickly",
      "Students and job seekers who want polished projects and portfolios"
    ],
    "description": [
      "You know Canva. But do you know Canva AI?",
      "Canva has changed. With Canva AI 2.0, you don't start with a template. You start with a conversation. Describe what you need, and Canva AI builds it, edits it, keeps it on-brand, and can even produce a full campaign of matching pieces at once.",
      "This course shows you how to use it properly.",
      "What you'll learn:",
      "• Turn ideas into designs: conversational, prompt-to-design creation",
      "• Edit precisely: change any single element without starting over",
      "• Create AI visuals: images in your chosen style",
      "• Teach Canva your style: Memory Library and \"About Me\" profile",
      "• Keep your brand consistent: Brand Intelligence",
      "• Build whole campaigns: one conversation, many coordinated pieces",
      "• Use your real work: Connectors and Web Research",
      "• Move beyond static: video generation, animation and AI voiceovers",
      "• Write with AI: Magic Write for copy, brainstorming and rewriting",
      "• Go interactive: Canva Code 2.0",
      "• Design with data: Sheets AI and scheduled tasks",
      "Idea → Generate → Design → Edit → Brand → Publish",
      "Every module includes practice prompts you run in Canva AI straight away, plus a \"Your turn\" task. The course ends with a capstone where you launch a complete campaign from a single conversation.",
      "Stop designing everything manually. Learn to turn ideas into polished content with Canva AI."
    ],
    "includes": [
      "18 modules, about 8 hours 40 minutes of learning (25–45 minutes per module)",
      "74 lessons explained in plain language",
      "39 guided Canva AI prompts you run as you learn",
      "23 hands-on \"Your turn\" tasks",
      "Ready-made design workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: launch a complete campaign from one conversation",
      "Knowledge checks in every module",
      "A prompt library with 60 ready-to-use Canva AI prompts",
      "Certificate of completion"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "gemini": {
    "subtitle": "Master Google Gemini beyond chat: combine documents into one answer, run Deep Research, build web pages in Canvas, create and edit images with Nano Banana, make music with Lyria, build custom Gems, automate Google Workspace, and talk to Gemini Live.",
    "learn": [
      "Understand what makes Gemini different: it connects information from many files and formats into one answer",
      "Attach several files at once and ask one connected question, then check the answer against your sources",
      "Write strong prompts with role, context and constraints",
      "Turn scattered notes into a polished draft, adjust tone, and get feedback on your own writing",
      "Pull exactly what you need from long documents, and compare several documents at once",
      "Run Deep Research reports, then turn them into an Audio Overview, a Canvas page or a quiz",
      "Build web pages and simple tools in Canvas, and fix code by describing the problem in plain English",
      "Create and edit images by talking to Gemini (Nano Banana), keeping a character consistent across images",
      "Make original music from a description or an image with Lyria, free on the Gemini app",
      "Use ready-made Gems, and build your own custom assistant with saved instructions",
      "Chain research, writing and visuals into one repeatable workflow",
      "Use Gemini inside Gmail, Docs, Sheets and Drive: create documents, analyse spreadsheets without formulas, and search your files",
      "Talk to Gemini Live hands-free in 45+ languages, and share your camera or screen",
      "Know Gemini's limits, protect confidential information, and verify AI content"
    ],
    "sections": [
      {
        "title": "Module 1: What Is Gemini & When to Use It",
        "lectures": [
          ["Not just a chatbot: a tool that combines information", 7],
          ["Why connecting information matters", 6],
          ["When Gemini is the right tool, and when something else fits better", 6],
          ["What's free before you pay for anything", 6]
        ]
      },
      {
        "title": "Module 2: Getting Started — Signup, Interface & Plans",
        "lectures": [
          ["Sign in and tour the screen", 8],
          ["Attach several files and ask one connected question", 8],
          ["Free vs Google AI Pro vs Google AI Ultra", 7],
          ["Check sources before trusting an important answer", 7]
        ]
      },
      {
        "title": "Module 3: The Core Synthesis Loop",
        "lectures": [
          ["Gather → Attach → Ask → Verify", 8],
          ["Prepare inputs so Gemini can connect them", 8],
          ["Ask connecting questions, not just \"summarise\"", 7],
          ["Check answers against the original sources", 7]
        ]
      },
      {
        "title": "Module 4: Writing Powerful Prompts — Role, Context, Constraints",
        "lectures": [
          ["How a role changes the answer", 8],
          ["Add context from your real situation", 8],
          ["Combine role, context and constraints", 7],
          ["When a plain question is enough", 7]
        ]
      },
      {
        "title": "Module 5: Writing & Editing with Confidence",
        "lectures": [
          ["Turn scattered notes into a structured draft", 8],
          ["Adapt tone and audience", 8],
          ["Get honest feedback on your own writing", 7],
          ["Expanding vs correcting content", 7]
        ]
      },
      {
        "title": "Module 6: Working with Large Documents",
        "lectures": [
          ["Pull out only the relevant information", 9],
          ["Structure findings in a usable format", 8],
          ["Analyse several large documents together", 8]
        ]
      },
      {
        "title": "Module 7: Deep Research",
        "lectures": [
          ["What happens during a Deep Research run", 8],
          ["Free vs paid limits (about 5 reports a month on the free plan)", 8],
          ["Turn a report into an Audio Overview, Canvas page or quiz", 7],
          ["Visual exploration (Ultra plan only)", 7]
        ]
      },
      {
        "title": "Module 8: Canvas — Code, Web Pages & Documents",
        "lectures": [
          ["Build a web page from a plain-English description", 8],
          ["Fix code problems without coding knowledge", 8],
          ["Edit code with plain-English instructions", 7],
          ["Use images and files as input for web building", 7]
        ]
      },
      {
        "title": "Module 9: Creating & Editing Images — Nano Banana",
        "lectures": [
          ["Generate images and edit them by talking", 6],
          ["Keep a character consistent across images", 6],
          ["Nano Banana vs Nano Banana Pro", 6],
          ["Text and infographics, and an honest limitation", 6],
          ["Google's guidance on verifying generated images", 6]
        ]
      },
      {
        "title": "Module 10: Creating Music — Lyria",
        "lectures": [
          ["Generate a track from a description or an image", 7],
          ["Genre, vocal/instrumental and length controls", 6],
          ["What's free right now", 6],
          ["What to know about commercial use", 6]
        ]
      },
      {
        "title": "Module 11: Gems — Your Own Custom Assistant",
        "lectures": [
          ["Use ready-made Gems for recurring tasks", 8],
          ["Create your own Gem with saved instructions", 8],
          ["Give a Gem the right tools for its job", 7],
          ["What free accounts can and can't do", 7]
        ]
      },
      {
        "title": "Module 12: Multi-Step Workflows",
        "lectures": [
          ["Chain research, writing and visuals into one workflow", 10],
          ["Build a workflow you can reuse", 10],
          ["When chaining is worth the extra steps", 10]
        ]
      },
      {
        "title": "Module 13: Google Workspace Automation — Docs, Sheets, Drive",
        "lectures": [
          ["Create a document from a plain description", 8],
          ["Analyse spreadsheet data without formulas", 8],
          ["Search and reason across your Drive files", 7],
          ["Build a reusable automation for a recurring task", 7]
        ]
      },
      {
        "title": "Module 14: Gemini Live & Voice",
        "lectures": [
          ["Start a voice conversation with Gemini Live", 7],
          ["Share your camera or screen live", 6],
          ["45+ languages supported", 6],
          ["When talking beats typing", 6]
        ]
      },
      {
        "title": "Module 15: Combining Features into Workflows",
        "lectures": [
          ["Decision guide: chat, Live or Workspace?", 10],
          ["Decision guide: Canvas, Nano Banana or Lyria?", 10],
          ["Decision guide: how much research depth?", 10]
        ]
      },
      {
        "title": "Module 16: Professional Use Cases",
        "lectures": [
          ["Workflow: Student", 5],
          ["Workflow: Job seeker", 5],
          ["Workflow: Working professional", 5],
          ["Workflow: Business owner", 5],
          ["Workflow: Content creator", 5],
          ["Workflow: Freelancer or consultant", 5]
        ]
      },
      {
        "title": "Module 17: Responsible AI & Limitations",
        "lectures": [
          ["Gemini's honest limits across text, images and audio", 7],
          ["When you need a qualified human", 6],
          ["Handling confidential information, especially in Workspace", 6],
          ["Citing AI-assisted work properly", 6]
        ]
      },
      {
        "title": "Module 18: Capstone — Build a Complete Multimedia Deliverable",
        "lectures": [
          ["Phase 1: frame your project", 7],
          ["Phase 2: gather and synthesise materials", 7],
          ["Phase 3: draft written content", 7],
          ["Phase 4: create a visual", 6],
          ["Phase 5: add audio", 6],
          ["Phase 6: build a reusable Gem", 6],
          ["Phase 7: final verification", 6]
        ]
      },
      {
        "title": "Bonus: Gemini Prompt Library",
        "lectures": [
          ["126 ready-to-use prompts, filterable by category and audience", 5]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "A computer or phone with a browser or the Gemini app",
      "A free Google account",
      "The free plan covers most of the course: Gemini Live, basic image generation, Lyria music, Canvas, Workspace file access and about 5 Deep Research reports a month",
      "Some features need Google AI Pro or higher: creating your own Gems, Nano Banana Pro and higher Deep Research limits. Visual exploration needs Google AI Ultra"
    ],
    "audience": [
      "Gemini users who want to go far beyond basic questions",
      "Students who want faster research, better writing and study aids",
      "Working professionals who use Google Workspace every day",
      "Business owners who want research, content, visuals and automation in one tool",
      "Content creators who want images, music and written content from one place"
    ],
    "description": [
      "Still using Gemini just to ask questions?",
      "Ask a question. Write an email. Summarise something. Generate some ideas. That's useful, but it's only one part of what Gemini can do.",
      "What if the same AI could help you:",
      "• Combine notes, PDFs and images into one connected answer",
      "• Run deeper research, with a full report",
      "• Build web pages and prototypes in Canvas",
      "• Create and edit images by talking",
      "• Create original music",
      "• Build your own specialised assistant",
      "• Work inside Gmail, Docs, Sheets and Drive",
      "• Talk naturally and show it what you're seeing",
      "Welcome to Gemini Deep Dive. This practical course takes you beyond basic prompting and into Gemini's most useful capabilities, step by step.",
      "Research → Write → Build → Create → Automate → Talk",
      "Every module includes practice prompts you run in Gemini straight away, plus a \"Your turn\" task. The course ends with a capstone where you build a complete project with text, visuals and audio.",
      "From business idea to creative output. Master Gemini beyond chat."
    ],
    "includes": [
      "18 modules, about 8 hours 50 minutes of learning (25–45 minutes per module)",
      "80 lessons explained in plain language",
      "35 guided Gemini prompts you run as you learn",
      "22 hands-on \"Your turn\" tasks",
      "Ready-made workflows for 6 roles: student, job seeker, professional, business owner, content creator and freelancer",
      "A 7-phase capstone: build a complete multimedia project with text, images and audio",
      "Knowledge checks in every module",
      "A prompt library with 126 ready-to-use Gemini prompts",
      "Certificate of completion"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "portfolio": {
    "subtitle": "Your resume gets you noticed. Your portfolio proves what you can do. Your interview wins the job. Build your own professional portfolio website from scratch using free AI tools, one step at a time. Turn your work into strong case studies, create a consistent personal brand, publish it live, and prepare for HR interview questions.",
    "learn": [
      "Understand why a portfolio showing your real work gets you selected for interviews",
      "Plan your portfolio’s structure with ChatGPT and put the sections in the most effective order",
      "Research what employers in your field expect to see right now, using Gemini",
      "Find your visual style with a Leonardo AI moodboard, and turn it into a one-page brand “identity sheet” in Canva",
      "Choose your 3–5 strongest projects, because fewer, stronger projects beat a long list",
      "Turn routine work into job-ready case studies (Problem → Approach → Result) with Claude, keeping every fact accurate",
      "Write a profile summary that matches your personal brand",
      "Organise all your content in one Notion table before you build",
      "Turn plain screenshots into polished mockups, and create matching skill icons and graphics",
      "Build a real, live, multi-page portfolio website with a project gallery and contact form using Lovable, no coding needed",
      "Publish your site with a shareable link, and connect your own domain if you want one",
      "Get interview-ready for your situation, and answer common HR questions with confidence"
    ],
    "sections": [
      {
        "title": "Module 1: Why Your Portfolio Is Your First Impression",
        "lectures": [
          ["A resume gets you noticed; a portfolio gets you selected", 4],
          ["The real reason most people never finish a portfolio", 4],
          ["What you’ll have by the end of the course", 4]
        ]
      },
      {
        "title": "Module 2: Planning Your Structure with ChatGPT",
        "lectures": [
          ["Asking AI for structure vs handing it your judgment", 6],
          ["Write a specific, role-based prompt", 6],
          ["Hands-on: get a 5-section outline for your own portfolio", 6]
        ]
      },
      {
        "title": "Module 3: Ordering Your Sections for Maximum Impact",
        "lectures": [
          ["Why section order matters as much as content", 5],
          ["The question each section silently answers for a recruiter", 5],
          ["Lock in your final section order", 5]
        ]
      },
      {
        "title": "Module 4: Researching What Your Field Wants with Gemini",
        "lectures": [
          ["Why live research beats general knowledge", 5],
          ["Find what portfolios in your target field emphasise right now", 5],
          ["Hands-on: research your own field", 5]
        ]
      },
      {
        "title": "Module 5: Finding Your Visual Identity with Leonardo AI",
        "lectures": [
          ["Why visual consistency builds trust", 5],
          ["Create a moodboard to explore styles", 5],
          ["Hands-on: pick two colours and a style word", 5]
        ]
      },
      {
        "title": "Module 6: Turning Your Mood into a Rulebook with Canva",
        "lectures": [
          ["Build a one-page identity sheet: colours, fonts, spacing", 5],
          ["What belongs on it, and what doesn’t", 5],
          ["Keep your look consistent across everything you create", 5]
        ]
      },
      {
        "title": "Module 7: Choosing What Stays and What Gets Cut",
        "lectures": [
          ["Why fewer, stronger projects work better", 4],
          ["Filter projects using your field research", 4],
          ["Shortlist your best 3–5 projects", 4]
        ]
      },
      {
        "title": "Module 8: Writing Your Case Studies with Claude",
        "lectures": [
          ["Translation, not invention: keep every fact true", 6],
          ["Turn routine work into Problem → Approach → Result case studies", 6],
          ["Write your profile summary", 5],
          ["Hands-on: write case studies for all your shortlisted projects", 5]
        ]
      },
      {
        "title": "Module 9: Staging Everything in Notion",
        "lectures": [
          ["One page and two tables for all your content", 6],
          ["Use Ready / Draft / WIP status labels so nothing unfinished gets published", 6]
        ]
      },
      {
        "title": "Module 10: Mockups, Graphics & Your Headshot",
        "lectures": [
          ["Turn plain screenshots into polished mockups in Canva, even for text-based work like emails or strategy decks", 5],
          ["Create header graphics and skill icons with Leonardo or Gemini", 5],
          ["Hands-on: build a matching skill-icon set", 5],
          ["Why your headshot should always be a real photo", 5]
        ]
      },
      {
        "title": "Module 11: Building Your Real Website with Lovable",
        "lectures": [
          ["How Lovable differs from drag-and-drop builders", 6],
          ["Build your homepage from your Notion content", 6],
          ["Create a page for each case study", 6],
          ["Make targeted edits without breaking what works", 6],
          ["Add your About page and contact form", 6],
          ["Check it on mobile", 5]
        ]
      },
      {
        "title": "Module 12: Going Live with Your Own Domain",
        "lectures": [
          ["Publish a shareable link straight away", 4],
          ["Buy and connect a custom domain (optional)", 3],
          ["A fresh-eyes review before you share your link", 3]
        ]
      },
      {
        "title": "Module 13: Your Full Build Recapped & Your Interview Playbook",
        "lectures": [
          ["Your whole build, traced from outline to live website", 5],
          ["Interview readiness for freshers and students", 4],
          ["Interview readiness for moving from non-IT into IT", 4],
          ["Interview readiness for switching industries or restarting after a layoff", 4],
          ["Presenting yourself well: the basics that matter", 4],
          ["Common HR questions, and how to answer them well", 4]
        ]
      }
    ],
    "requirements": [
      "No design, coding or AI experience needed",
      "A computer with a modern browser",
      "Free accounts for ChatGPT, Gemini, Leonardo AI, Canva, Claude, Notion and Lovable. The free plans are enough for the course",
      "Your own work samples, screenshots or project notes to turn into case studies",
      "A real photo of yourself for your headshot",
      "Optional: a custom domain costs about US$10–15 a year. Connecting it in Lovable needs a paid Lovable plan, but you can share your free Lovable link without one"
    ],
    "audience": [
      "Freshers and students preparing for their first job",
      "IT professionals switching roles",
      "Non-IT professionals moving into IT",
      "Anyone job-hunting after a layoff or career break",
      "Freelancers and professionals who want a personal brand page"
    ],
    "description": [
      "Your resume gets you noticed. Your portfolio proves what you can do. Your interview wins the job.",
      "Most people never finish a portfolio. They don’t know what to include, how to make it look professional, or how to put it online. This free course solves all three, step by step, with free AI tools.",
      "You’ll build your portfolio one piece at a time:",
      "• Plan the structure with ChatGPT",
      "• Research what your field expects with Gemini",
      "• Create your visual identity with Leonardo AI and Canva",
      "• Turn your work into strong case studies with Claude",
      "• Organise everything in Notion",
      "• Create mockups, icons and graphics",
      "• Build a live website with Lovable",
      "• Publish it and share your link",
      "• Prepare for HR interview questions",
      "Plan → Research → Brand → Write → Stage → Design → Build → Publish → Interview",
      "Every module uses what you made in the one before, so nothing is wasted. You finish with a professional portfolio website that shows your skills, projects and achievements, not just a list on a resume.",
      "Don’t just tell recruiters what you know. Show them what you can do.",
      "Your next interview could be your next opportunity. Build your portfolio, get interview-ready and present your best professional self."
    ],
    "includes": [
      "13 short modules, about 4 hours of learning",
      "29 lessons with click-by-click instructions",
      "8 ready-to-use AI prompts with example results",
      "5 hands-on “Your turn” tasks that build your own portfolio",
      "30+ knowledge-check activities",
      "Step-by-step guides for 7 free AI tools",
      "An interview playbook for freshers, career switchers and job seekers after a layoff",
      "A live portfolio website you build yourself",
      "Certificate of completion",
      "Access for 7 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "job-agent": {
    "subtitle": "What if your job search worked on AI instead of hours of manual effort? Build a complete AI-powered job search system: find your strengths, choose your direction, close skill gaps, build a strong CV and LinkedIn profile, score and shortlist the right jobs, win interviews and negotiate offers. Then automate the weekly job scan with an AI agent in n8n.",
    "learn": [
      "Map the skills you’ve been underselling with the Four Layers framework",
      "Write better AI prompts with the CORE method",
      "Choose your career direction using real market research from Perplexity and the Direction Radar",
      "Write a one-line positioning statement for your target role",
      "Find your skill gaps with the Bridge Method, rank them by impact and effort, and get a learning plan",
      "Build a Master CV with strong, evidence-based bullet points (the Proof Stack: Action, Scope, Result)",
      "Tailor your CV for each job by cutting, never inventing, so it gets past screening filters",
      "Write cover letters based on real company research, and create proof-of-work entries",
      "Build a LinkedIn profile, headline and About section that get read",
      "Write short outreach messages and posts that show real expertise",
      "Apply like a system: choose the right channels, tailor several applications at once, and track each job with a Fit Score",
      "Prepare STAR+L interview stories and a strong self-introduction, and practise with an AI mock interview",
      "Benchmark salary with Gemini, evaluate offers and negotiate with confidence",
      "Run a repeatable weekly system: Scan → Score → Shortlist → Ship → Study",
      "Build an n8n automation that scans job alert emails every Monday, scores each job with AI, logs the best matches in Google Sheets and emails you a shortlist"
    ],
    "sections": [
      {
        "title": "Module 1: Find the Skills You’ve Been Underselling",
        "lectures": [
          ["The Four Layers of what you bring to a job", 9],
          ["The CORE method for writing AI prompts", 9],
          ["Why real detail makes all the difference", 9],
          ["Hands-on: build your Four-Layer skills map", 8]
        ]
      },
      {
        "title": "Module 2: Choose Your Direction",
        "lectures": [
          ["The Direction Radar: score directions instead of guessing", 10],
          ["Research real market demand with Perplexity", 10],
          ["Write your positioning statement", 10],
          ["Hands-on: choose your target role", 10]
        ]
      },
      {
        "title": "Module 3: Close the Gap — Skill Gap Analysis",
        "lectures": [
          ["The Bridge Method: your skills vs the role’s requirements", 9],
          ["Rank gaps by impact and effort with Claude", 9],
          ["Find current learning resources with Perplexity", 9],
          ["Hands-on: build a prioritised learning plan", 8]
        ]
      },
      {
        "title": "Module 4: Build Your Master CV",
        "lectures": [
          ["Build one complete Master CV to cut every version from", 9],
          ["The Proof Stack: Action, Scope, Result", 9],
          ["Rewrite weak bullets with ChatGPT", 9],
          ["Write your professional summary with Claude", 9],
          ["What to do when you don’t have exact numbers", 9]
        ]
      },
      {
        "title": "Module 5: Get Past the Filters",
        "lectures": [
          ["The Mirror Test: match the job posting’s language", 9],
          ["Find gaps between your CV and a real posting with Claude", 9],
          ["Cut your Master CV into a tailored version with ChatGPT", 9],
          ["Where tailoring turns into fabrication, and how to avoid it", 8]
        ]
      },
      {
        "title": "Module 6: Stand Out Beyond the CV",
        "lectures": [
          ["The One-Proof Rule for cover letters", 10],
          ["Research the company with Perplexity first", 10],
          ["Write a focused cover letter with Claude", 10],
          ["Proof of work for every profession, not just designers", 10]
        ]
      },
      {
        "title": "Module 7: Build Your Professional Presence — LinkedIn",
        "lectures": [
          ["The 3-Second / 30-Second / 3-Minute Test", 10],
          ["Generate headline options with ChatGPT", 10],
          ["Write your About section with Claude", 10],
          ["Keep your experience section consistent with your CV", 10]
        ]
      },
      {
        "title": "Module 8: Network Like a Professional",
        "lectures": [
          ["The 3-Line outreach message", 14],
          ["Signal Posts that show expertise, not announcements", 13],
          ["A Weekly Outreach Budget you can stick to", 13]
        ]
      },
      {
        "title": "Module 9: Apply Like a System",
        "lectures": [
          ["The Channel Mix: where to apply first", 10],
          ["The 80/20 Tailor: customise several similar applications at once", 10],
          ["A job tracker with a Fit Score", 10],
          ["Value-add follow-up messages", 10]
        ]
      },
      {
        "title": "Module 10: Win the Interview",
        "lectures": [
          ["STAR+L stories: STAR plus what you learned", 10],
          ["A 3-Beat self-introduction", 10],
          ["Questions that probe your own skill gaps, generated with ChatGPT", 10],
          ["Hands-on: a live AI mock interview", 10],
          ["Questions to ask the interviewer", 10]
        ]
      },
      {
        "title": "Module 11: Evaluate & Negotiate the Offer",
        "lectures": [
          ["Beyond the Number: look at the whole offer", 12],
          ["Benchmark salary with Gemini", 11],
          ["Anchor and Ask: evidence first, then a specific ask", 11],
          ["Accept, decline and response emails with ChatGPT", 11]
        ]
      },
      {
        "title": "Module 12: Your Ai-Powered Weekly Job Search System",
        "lectures": [
          ["The Weekly Search Engine: Scan, Score, Shortlist, Ship, Study", 13],
          ["Where AI acts, and where you decide", 13],
          ["Run the Scan and Score stages with AI prompts", 12],
          ["A weekly review that keeps improving your search", 12]
        ]
      },
      {
        "title": "Module 13: Live Build — Automate Your Job Search with n8n",
        "lectures": [
          ["Set up a free n8n account", 6],
          ["Set up job alert emails", 6],
          ["Schedule the workflow to run every Monday", 6],
          ["Connect Gmail to read the last 7 days of job alerts", 6],
          ["Connect an AI model to score every job against your profile", 6],
          ["Filter out low-fit jobs automatically", 6],
          ["Log high-fit jobs in your Google Sheets tracker", 6],
          ["Get a weekly shortlist email in your inbox", 6],
          ["Test it before you trust it", 6],
          ["Why it stops at your inbox, not at Submit", 6]
        ]
      }
    ],
    "requirements": [
      "No coding or AI experience needed for Modules 1–12",
      "A computer with a modern browser",
      "Free accounts for ChatGPT, Claude, Perplexity and Gemini",
      "Your current CV or work history notes",
      "A LinkedIn profile (or create one during the course)",
      "For the optional n8n module: a free n8n Cloud trial, a Gmail account and Google Sheets",
      "The AI step in n8n needs an OpenAI (or similar) API key, which requires adding a payment method. Usage costs are small, but they aren’t free"
    ],
    "audience": [
      "Freshers and students starting their first job search",
      "Professionals looking for their next role in the same field",
      "Career switchers moving into a new field",
      "Anyone job-hunting after a layoff or career break",
      "Anyone who wants a systematic, AI-assisted job search instead of scattered applications"
    ],
    "description": [
      "What if your job search worked on AI instead of hours of manual effort?",
      "Stop checking hundreds of jobs one by one and sending the same CV everywhere. In this free course, you build your own AI-powered job search system that understands your profile, finds the right opportunities and helps you apply smarter.",
      "What you’ll build:",
      "• A skills map and career direction",
      "• A skill gap analysis and learning plan",
      "• A Master CV and tailored versions for each job",
      "• Cover letters and proof-of-work entries",
      "• A LinkedIn profile that gets read",
      "• A job tracker with Fit Scores",
      "• An interview story bank and a mock interview",
      "• A salary benchmark and negotiation script",
      "• An AI agent in n8n that scans, scores and shortlists jobs every week",
      "Discover → Direct → Close the gap → CV → Profile → Network → Apply → Interview → Negotiate → Automate",
      "The final module turns everything into an automation that runs every Monday. It reads your job alert emails, scores each job against your profile with AI, logs the best matches in Google Sheets, and emails you a shortlist. You stay in control of what you actually apply for.",
      "This isn’t just about learning AI. It’s about building a system that works for your career."
    ],
    "includes": [
      "13 modules, about 9 hours of learning",
      "95 lessons with clear, step-by-step guidance",
      "30 ready-to-use AI prompts with example results",
      "22 hands-on “Your turn” tasks that build your own job search kit",
      "20+ knowledge-check activities",
      "A simple, memorable framework for every step",
      "A live n8n automation build, step by step (optional, technical)",
      "A ready-made job tracker with Fit Scores",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "meta-ads": {
    "subtitle": "Want to go beyond boosting posts? Learn Facebook and Instagram advertising from scratch, with ChatGPT as your research assistant, copywriter and analyst. Set up your accounts and tracking, research customers, create ads, launch lead and sales campaigns, retarget visitors, read reports, optimise and scale, and prepare for the Meta Certified Media Buying Professional (410-101) exam.",
    "learn": [
      "Understand how Meta advertising works: the ad auction, campaign structure, objectives and the numbers that matter",
      "Work out how much you can afford to pay for a lead or a sale before spending anything",
      "Set up a Facebook Page, an Instagram professional account and a secure business portfolio",
      "Create an ad account, add billing and GST details, and set spending limits",
      "Install tracking with the Meta Pixel and Conversions API, and test that it works",
      "Research customers and competitors with ChatGPT and the Meta Ad Library, and design an offer worth advertising",
      "Build a ChatGPT \"Ad Brain\" that knows your brand, so every output is on-brief and fast",
      "Write hooks, ad copy and headlines that stop the scroll and stay within Meta's ad policies",
      "Create images, carousels and Reels in Canva and on your phone, sized for every placement",
      "Schedule organic posts and set up inbox auto-replies in Meta Business Suite",
      "Choose the right objective, budget, bid strategy and placements, and understand Advantage+",
      "Launch a lead-generation campaign with an instant form and a Google Sheets lead tracker",
      "Launch an online-store sales campaign with a product catalogue",
      "Build custom, lookalike and retargeting audiences",
      "Read Ads Manager reports, attribution and breakdowns, and build a weekly dashboard",
      "Optimise, A/B test, set automated rules, refresh creative and scale without breaking results",
      "Prepare for the Meta 410-101 exam with a full 60-question timed mock test",
      "Work with clients professionally as a freelancer or media buyer"
    ],
    "sections": [
      {
        "title": "Module 1: How Meta Advertising Really Works",
        "lectures": [
          ["The Meta toolset and what each tool is for", 15],
          ["How the ad auction decides who sees your ad", 15],
          ["Campaign, ad set and ad: the three levels", 15],
          ["The six campaign objectives and the customer journey", 15],
          ["Core metrics and unit economics", 15],
          ["Lab: set up your ChatGPT workspace", 15]
        ]
      },
      {
        "title": "Module 2: Building the Brand Home",
        "lectures": [
          ["Who owns what: the ownership model", 15],
          ["Create a Facebook Page and switch Instagram to a professional account", 15],
          ["Create a business portfolio and add your Page and Instagram", 15],
          ["Give people the right level of access", 15],
          ["Lab: turn on two-factor authentication and add a backup admin", 15],
          ["Business verification and working with agencies", 15]
        ]
      },
      {
        "title": "Module 3: Ad Account, Billing, GST & Spending Controls",
        "lectures": [
          ["The two ad account settings you can't change later", 15],
          ["Automatic vs manual payments", 15],
          ["Add a payment method and business details (GST)", 15],
          ["Account spending limits vs budgets", 15],
          ["Invoices, receipts and fixing failed payments", 15]
        ]
      },
      {
        "title": "Module 4: Tracking — Meta Pixel & Conversions API",
        "lectures": [
          ["Why tracking matters", 18],
          ["Datasets, Pixel and Conversions API explained simply", 17],
          ["Choose which events to track", 17],
          ["Lab: install tracking on your website (three ways)", 17],
          ["Test events with Test Events and Meta Pixel Helper", 17],
          ["Event Match Quality, privacy and consent", 17],
          ["What to do if you don't have a website", 17]
        ]
      },
      {
        "title": "Module 5: Customer & Competitor Research with ChatGPT",
        "lectures": [
          ["Customer segments, pain points and buying triggers", 20],
          ["Turn reviews into an objection map", 20],
          ["Lab: build a competitor swipe sheet from the Meta Ad Library", 20],
          ["Find gaps in competitors' messaging", 20],
          ["Design and stress-test an offer", 20],
          ["Write a one-sentence positioning statement", 20]
        ]
      },
      {
        "title": "Module 6: Prompt Engineering for Advertisers",
        "lectures": [
          ["Why prompts fail", 23],
          ["The 10-part prompt framework", 23],
          ["Lab: build your \"Ad Brain\" in ChatGPT", 22],
          ["The self-critique loop for better output", 22]
        ]
      },
      {
        "title": "Module 7: AI Copywriting for Facebook & Instagram Ads",
        "lectures": [
          ["Anatomy of an ad", 20],
          ["Three copy frameworks and eight angles", 20],
          ["Generate hooks with ChatGPT", 20],
          ["Lab: a copy bank in Google Sheets with automatic character counts", 20],
          ["Policy-safe copy: the rules that catch beginners", 20],
          ["Meta's text generation in Ads Manager", 20]
        ]
      },
      {
        "title": "Module 8: Visual & Video Creative",
        "lectures": [
          ["Formats, sizes, ratios and safe zones", 20],
          ["Creative principles that work on Meta", 20],
          ["Lab: design a static ad and a carousel in Canva", 20],
          ["Lab: film and edit a 20-second Reel on your phone", 20],
          ["When to use AI images, and when not to", 20],
          ["Advantage+ creative enhancements", 20]
        ]
      },
      {
        "title": "Module 9: The Organic Engine",
        "lectures": [
          ["Why organic still matters when you run ads", 15],
          ["Plan a 4-week content calendar", 15],
          ["Lab: schedule posts in Business Suite Planner", 15],
          ["Lab: set up inbox auto-replies and FAQs", 15],
          ["Use Insights to choose which posts deserve ad budget", 15]
        ]
      },
      {
        "title": "Module 10: Campaign Architecture",
        "lectures": [
          ["The campaign creation flow, step by step", 18],
          ["What \"Advantage+ on\" really means", 17],
          ["Bid strategies, budgets and placements", 17],
          ["The learning phase and why patience matters", 17],
          ["Account structure and naming conventions", 17],
          ["Special ad categories", 17],
          ["Lab: walk through the setup and save a draft (no spend)", 17]
        ]
      },
      {
        "title": "Module 11: Launch Lab 1 — Lead Generation Campaign",
        "lectures": [
          ["Build a Leads campaign with a local audience", 19],
          ["Create an instant form, section by section", 19],
          ["Build 4–5 diverse ads", 19],
          ["Lab: publish (or stage) the campaign", 19],
          ["The first 72 hours after you publish", 19],
          ["Lab: a lead tracker in Google Sheets", 19],
          ["Call and WhatsApp follow-up scripts", 18],
          ["Click-to-WhatsApp and DM ads", 18]
        ]
      },
      {
        "title": "Module 12: Launch Lab 2 — Online Store Sales Campaign",
        "lectures": [
          ["The store's numbers before you build", 24],
          ["Create a product catalogue in Commerce Manager", 24],
          ["Improve product titles and descriptions with ChatGPT", 24],
          ["Build an Advantage+ sales campaign", 24],
          ["Creative-led ads and catalogue ads", 24]
        ]
      },
      {
        "title": "Module 13: Audiences & Retargeting",
        "lectures": [
          ["Audience types in plain language", 20],
          ["Lab: build website custom audiences", 20],
          ["Customer lists, handled carefully", 20],
          ["Lookalike audiences", 20],
          ["The retargeting funnel, with messages for each stage", 20],
          ["Exclusions, overlap and frequency", 20]
        ]
      },
      {
        "title": "Module 14: Measurement & Reporting",
        "lectures": [
          ["What to look at first in Ads Manager", 15],
          ["Custom columns and breakdowns", 15],
          ["Attribution in 2026: how Meta credits conversions", 15],
          ["Compare Meta's numbers with GA4 and your store", 15],
          ["UTM parameters", 15],
          ["Lab: build a weekly dashboard", 15],
          ["Analyse an exported report with ChatGPT", 15],
          ["Did the ads really cause the sales? Lift tests", 15]
        ]
      },
      {
        "title": "Module 15: Optimisation, Testing & Scaling",
        "lectures": [
          ["Delivery statuses and relevance diagnostics", 15],
          ["The optimisation decision tree", 15],
          ["A/B tests and automated rules", 15],
          ["Lab: build your optimisation rulebook", 15],
          ["Refresh creative before it fatigues", 15],
          ["Scale without losing efficiency", 15],
          ["Rejected ads, Account Quality and Opportunity Score", 15]
        ]
      },
      {
        "title": "Module 16: Meta 410-101 Exam Preparation",
        "lectures": [
          ["The exam at a glance, with verified facts", 15],
          ["Old vs new Meta terminology", 15],
          ["The 4-step technique for scenario questions", 15],
          ["High-yield topics", 15],
          ["Study with ChatGPT", 15],
          ["A 3-week study plan", 15],
          ["Lab: take the official Meta practice test", 15],
          ["60-question timed mock exam", 15]
        ]
      },
      {
        "title": "Module 17: Final Project & Your Own Playbook",
        "lectures": [
          ["Lab: test the complete advertising system end to end", 18],
          ["A 30-day operating plan", 18],
          ["Adapt the blueprint to any industry or your own business", 18],
          ["Work with clients professionally: onboarding pack", 18],
          ["Course recap", 18]
        ]
      }
    ],
    "requirements": [
      "No marketing or technical experience needed",
      "A laptop or desktop (strongly recommended for Ads Manager) and a smartphone",
      "A personal Facebook profile (required to use Meta's business tools)",
      "An Instagram account you can switch to a professional account",
      "Free accounts: ChatGPT, Google (Sheets) and Canva",
      "A website is helpful for tracking and sales campaigns; a no-website path is included",
      "Meta's tools are free. Your only cost is the ad budget you choose to spend, and you can follow the labs without launching paid ads"
    ],
    "audience": [
      "Complete beginners with no marketing background",
      "Business owners (shops, salons, clinics, gyms, coaching institutes, online stores) who want to run their own ads without wasting budget",
      "Job seekers and freelancers who want a portfolio project and the Meta 410-101 certification",
      "Marketers who want to add AI to their advertising workflow",
      "Anyone who wants to move from boosting posts to real media buying"
    ],
    "description": [
      "Ready to go beyond boosting Facebook and Instagram posts?",
      "Effective Meta advertising takes more than clicking Boost Post. You need to understand your audience, create stronger ads, set up campaigns correctly, track results, build retargeting audiences, read reports and keep improving.",
      "Most beginners fail with Meta ads for predictable reasons: broken tracking, a vague offer, the wrong objective, weak creative, panicking during the learning phase, and misreading reports. This course gives each of those its own module, with hands-on practice.",
      "What you'll explore:",
      "• AI-powered customer and competitor research",
      "• AI copywriting for Meta ads",
      "• Images, carousels and Reels",
      "• Meta Business Suite and organic posting",
      "• Tracking with the Meta Pixel and Conversions API",
      "• Ads Manager campaign setup and Advantage+",
      "• Budgets, billing, GST and spending controls",
      "• Retargeting, custom and lookalike audiences",
      "• Reports, attribution and dashboards",
      "• Optimisation, testing and scaling",
      "• Meta 410-101 exam preparation",
      "• Freelancing and working with clients",
      "Tools you'll use: ChatGPT • Meta Business Suite • Ads Manager • Events Manager • Meta Ad Library • Commerce Manager • Advantage+ • Meta AI • Canva • Google Sheets",
      "Every module follows the same rhythm: understand it, see exactly where to click, do it in the real tool, check your knowledge, fix common mistakes, and apply it to the project.",
      "Move from simply posting on social media to running structured Facebook and Instagram campaigns that are researched, created, launched, measured and optimised."
    ],
    "includes": [
      "17 modules, about 30 hours of learning",
      "120 lessons, including 33 click-by-click \"where to click\" guides",
      "22 hands-on labs in Meta's real tools",
      "34 ready-to-use ChatGPT prompts with expected results",
      "16 practical assignments plus a final project",
      "175+ knowledge-check activities (drag-and-drop, matching, ordering and more)",
      "A 60-question timed mock exam for Meta 410-101 (105 minutes)",
      "A prompt library with 315 copy-ready prompts for 18 industries",
      "A glossary of 89 advertising terms in plain language",
      "Troubleshooting guides in every module",
      "Technical and non-technical tracks",
      "Certificate of completion",
      "Access for 18 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "ai-marketing": {
    "subtitle": "Still wondering what to post, write or create every day? Build the marketing system behind your business with AI. Find your Unique Selling Proposition, write copy that sells, design your own visuals, plan a week of social posts in one go, turn customer questions into content, write emails and ad copy, track what works, and run a repeatable 30-day marketing plan.",
    "learn": [
      "See where your marketing time really goes, and what AI can handle vs what stays your decision",
      "Create a complete design from a description with Canva AI’s Magic Studio, then make it on-brand",
      "Find your Unique Selling Proposition by analysing real customer feedback with Claude",
      "Store your USP in Notion so every piece of content stays on-message",
      "Write marketing posts with Jasper, generate variations, and adapt one message for every platform",
      "Create custom images with Midjourney instead of generic stock photos, and brand them in Canva",
      "Plan a full week of social media content with ChatGPT in one sitting, with matching visuals",
      "Turn your customers’ questions into your best content ideas",
      "Write a complete email sequence and ad copy variations for A/B testing",
      "Define a specific ad audience instead of “everyone”",
      "Track the few marketing numbers that matter in Notion, and find patterns with ChatGPT",
      "Bring it all together into a 30-day AI marketing system you can repeat every month"
    ],
    "sections": [
      {
        "title": "Module 1: How AI Changes Modern Marketing",
        "lectures": [
          ["Where your marketing time really disappears", 6],
          ["AI as your creative assistant, not your strategist", 6],
          ["Canva AI’s Magic Studio: describe it, get a design", 6],
          ["Better prompts, better first drafts", 6],
          ["Hands-on: create and refine a real design", 6]
        ]
      },
      {
        "title": "Module 2: Discovering Your Unique Selling Proposition",
        "lectures": [
          ["What a USP is, and why every message needs one", 6],
          ["Analyse customer feedback for patterns with Claude", 6],
          ["Turn insights into a USP statement in your customers’ own words", 6],
          ["Store your USP in Notion", 6],
          ["Hands-on: find and store your USP", 6]
        ]
      },
      {
        "title": "Module 3: Writing Words That Sell — AI Copywriting",
        "lectures": [
          ["What separates strong copy from weak copy", 6],
          ["Write a marketing post with Jasper, grounded in your USP", 6],
          ["Generate variations instead of settling for the first draft", 6],
          ["Adapt one message for Instagram, Facebook, LinkedIn and more", 6],
          ["Hands-on: write and adapt your own copy", 6]
        ]
      },
      {
        "title": "Module 4: Designing Scroll-Stopping Visuals",
        "lectures": [
          ["Why stock photos fail to stop the scroll", 6],
          ["Create custom images with Midjourney", 6],
          ["Turn one image into multiple branded posts in Canva AI", 6],
          ["A simple workflow for every visual you need", 6],
          ["Hands-on: create and brand a visual", 6]
        ]
      },
      {
        "title": "Module 5: Building a Social Media Content System",
        "lectures": [
          ["Why consistency beats perfection", 6],
          ["A ready-made weekly content framework", 6],
          ["Plan a full week of posts with ChatGPT in one go", 6],
          ["Create matching visuals for the whole week", 6],
          ["Schedule once, post all week", 6],
          ["Hands-on: build a real week of content", 5]
        ]
      },
      {
        "title": "Module 6: Turning Customer Questions into Content",
        "lectures": [
          ["Your customers already tell you what to post", 8],
          ["Find the highest-value questions with Claude", 8],
          ["Match the right format to each question", 7],
          ["A repeatable question-to-content workflow", 7]
        ]
      },
      {
        "title": "Module 7: Email Marketing & Paid Ads",
        "lectures": [
          ["Why email and ads still matter alongside organic posts", 7],
          ["Write a complete email sequence grounded in your USP", 7],
          ["Draft ad copy variations for A/B testing", 7],
          ["Define a specific target audience", 7],
          ["Hands-on: build an email sequence and ad set", 7]
        ]
      },
      {
        "title": "Module 8: Measuring Marketing Performance",
        "lectures": [
          ["The few numbers that matter, with no complex dashboard", 8],
          ["Set up a simple tracking system in Notion", 8],
          ["Find patterns in your data with ChatGPT", 7],
          ["A monthly review habit", 7]
        ]
      },
      {
        "title": "Module 9: Your 30-Day AI Marketing System",
        "lectures": [
          ["Bring everything into one 30-day plan", 8],
          ["What belongs in each of the 4 weekly phases", 8],
          ["Build a reusable AI Marketing Hub in ChatGPT", 8],
          ["The habits worth keeping after Day 30", 8],
          ["Final mission: build your own 30-day system", 8]
        ]
      }
    ],
    "requirements": [
      "No AI or marketing experience needed",
      "A computer with a modern browser",
      "Free accounts: Canva, Claude, ChatGPT and Notion",
      "Midjourney needs a paid subscription (no free plan, from about US$10/month). You can use Canva AI’s image generator as a free alternative",
      "Jasper is a paid tool with a free trial. ChatGPT or Claude can do the same copywriting tasks for free",
      "Your own business details and some customer feedback or reviews"
    ],
    "audience": [
      "Small business owners who handle their own marketing",
      "Service providers: studios, salons, clinics, coaches and consultants",
      "Marketers who want to produce content faster with AI",
      "Freelancers who manage social media for clients",
      "Anyone who struggles to post consistently and wants a repeatable system"
    ],
    "description": [
      "Still wondering what to post, write or create every day?",
      "Marketing can mean constantly asking yourself: What should I post? What should I say? What image should I use? How do I stand out? How do I reach more customers? Is my marketing actually working?",
      "This course shows you how to use AI to answer those questions systematically, without needing any previous AI experience.",
      "The complete AI marketing workflow:",
      "• USP → Copy → Visuals → Social Media → Customer Content → Email → Ads → Analytics → 30-Day System",
      "What you’ll walk away with:",
      "• A clear Unique Selling Proposition",
      "• AI-assisted marketing copy",
      "• Custom visual content",
      "• A social media content system",
      "• Content ideas from real customer questions",
      "• An email marketing sequence",
      "• Ad copy variations for testing",
      "• A simple marketing tracker with AI analysis",
      "• Your own 30-day AI marketing system",
      "Each AI tool is used for the job it does best: Canva AI for design, Claude for analysis, Jasper for copy, Midjourney for custom images, ChatGPT for planning and analysis, and Notion to keep it all organised.",
      "Stop starting your marketing from scratch. Build a system you can run again and again."
    ],
    "includes": [
      "9 modules, about 4 hours 50 minutes of learning",
      "41 lessons with clear, practical steps",
      "20 ready-to-use AI prompts for real marketing tasks",
      "9 hands-on “Your turn” tasks that build your own marketing system",
      "30+ knowledge-check activities",
      "A 30-day AI Marketing System template",
      "A reusable AI Marketing Hub in ChatGPT",
      "Certificate of completion",
      "Access for 15 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "ai-finance": {
    "subtitle": "Use AI to classify transactions, investigate anomalies, research tax questions, analyse long financial documents, explain variances, build forecasts and write client communications. This is practical, hands-on training for accountants, CAs, CPAs and bookkeepers, using four leading AI tools on real client scenarios.",
    "learn": [
      "Sort your accounting tasks into automatable, AI-assisted and human-only, and choose where to start",
      "Understand why confusing “AI assists” with “AI replaces” creates professional liability",
      "Structure transaction data so AI can categorise it reliably, and find reconciliation mismatches with Gemini",
      "Flag unusual transactions with AI, get its reasoning, and build the right level of review",
      "Write precise tax research queries in Perplexity, and validate every cited source",
      "Turn complex tax provisions into clear, client-ready explanations and review checklists",
      "Summarise long financial documents, such as a 40-page loan agreement, with Claude",
      "Identify risk indicators and check disclosure completeness in financial statements",
      "Turn technical findings into plain-language client emails and executive summaries",
      "Run variance analysis with ChatGPT, set materiality thresholds and write variance explanations",
      "Build baseline forecasts and best, expected and worst-case scenarios, including cost-increase impact",
      "Turn your analysis into structured advisory recommendations and meeting agendas",
      "Know what should never go into an AI chat, when to disclose AI use, and how to write an AI usage policy",
      "Build your own AI Accounting Hub: a reusable library of prompts and workflows"
    ],
    "sections": [
      {
        "title": "Module 1: How AI Fits in Accounting — Workflow Mapping",
        "lectures": [
          ["What’s left for AI after your accounting software", 6],
          ["Why most accountants approach AI backwards", 6],
          ["Three task types: automatable, AI-assisted, human-only", 6],
          ["Classify your workflow with Gemini", 6],
          ["Hands-on: map and prioritise your own workflow", 6]
        ]
      },
      {
        "title": "Module 2: Bookkeeping — Transaction Categorisation & Reconciliation",
        "lectures": [
          ["Why bookkeeping suits AI so well", 6],
          ["Structure transaction data first", 6],
          ["Categorise transactions by expense type with Gemini", 6],
          ["Invoice matching and reconciliation mismatches", 6],
          ["Why data quality decides accuracy", 6],
          ["Hands-on: categorise and reconcile real transactions", 5]
        ]
      },
      {
        "title": "Module 3: Bookkeeping — Anomaly Detection & Exceptions",
        "lectures": [
          ["Flag unusual transactions with AI", 7],
          ["Get AI’s reasoning for each flag", 7],
          ["Appropriate vs redundant oversight", 7],
          ["Build calibrated trust in AI-flagged exceptions", 7],
          ["Hands-on: detect and investigate anomalies", 7]
        ]
      },
      {
        "title": "Module 4: Tax Research with AI",
        "lectures": [
          ["Why Perplexity suits tax research", 6],
          ["Write a specific, effective tax research query", 6],
          ["Validate cited, authoritative sources", 6],
          ["Turn complex tax language into a client-ready explanation", 6],
          ["Generate a tax return review checklist", 6],
          ["Hands-on: research a tax question end to end", 5]
        ]
      },
      {
        "title": "Module 5: Financial Document Analysis",
        "lectures": [
          ["Why Claude suits long documents", 7],
          ["Summarise a 40-page loan agreement quickly", 7],
          ["Identify risk indicators across financial statements", 7],
          ["Check disclosure completeness", 7],
          ["The limits of relying on AI for risk analysis", 7]
        ]
      },
      {
        "title": "Module 6: Drafting Client Communication",
        "lectures": [
          ["Explain technical findings in plain language", 9],
          ["Adjust tone for different audiences without changing the facts", 9],
          ["Write an executive summary from a detailed analysis", 9],
          ["Build reusable communication templates", 8]
        ]
      },
      {
        "title": "Module 7: Variance Analysis",
        "lectures": [
          ["Calculate and structure variances with ChatGPT", 9],
          ["Set a materiality threshold to focus on what matters", 9],
          ["Write a variance narrative that links numbers to the business", 9],
          ["Why explaining every variance is counterproductive", 8]
        ]
      },
      {
        "title": "Module 8: Forecasting & Scenario Modelling",
        "lectures": [
          ["Build a baseline revenue projection", 9],
          ["Model multiple scenarios instead of a single forecast", 9],
          ["See how a cost increase flows through to profit", 9],
          ["Why showing only the optimistic case is a professional risk", 8]
        ]
      },
      {
        "title": "Module 9: Ai-Driven Advisory Services",
        "lectures": [
          ["Turn analysis into structured recommendations with projected impact", 9],
          ["Structure an advisory meeting agenda", 9],
          ["How to position your use of AI with clients", 9],
          ["Hands-on: build an advisory recommendation and agenda", 8]
        ]
      },
      {
        "title": "Module 10: Responsible AI, Professional Liability & Your AI Accounting Hub",
        "lectures": [
          ["What should never go into a general AI chat", 8],
          ["Professional liability doesn’t disappear with AI", 8],
          ["When to disclose AI use to clients or regulators", 8],
          ["Draft an AI usage policy for your practice", 8],
          ["Final mission: complete your AI Accounting Hub", 8]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "Basic accounting knowledge (the course is designed for working accountants and bookkeepers)",
      "A computer with a modern browser",
      "Free accounts for Gemini, Perplexity, Claude and ChatGPT",
      "Practise with sample or anonymised data, never real confidential client data in a general AI chat"
    ],
    "audience": [
      "Chartered Accountants, CPAs and accounting professionals",
      "Bookkeepers and accounts executives",
      "Accounting firm partners and practice managers",
      "Finance professionals who prepare forecasts, variance reports and client communications",
      "Commerce students preparing for accounting careers"
    ],
    "description": [
      "Discover how AI can support everything from bookkeeping and tax research to forecasting and client advisory.",
      "Imagine having AI help you classify transactions, investigate anomalies, research tax questions, analyse lengthy financial documents, explain variances, build forecasts and prepare client communications. That’s what this course teaches.",
      "AI across your accounting workflow:",
      "• Bookkeeping: transaction categorisation and reconciliation",
      "• Anomaly detection: investigate exceptions and unusual transactions",
      "• Tax research: build effective queries and validate cited sources",
      "• Financial documents: analyse statements, risks and disclosures",
      "• Client communication: turn technical findings into clear language",
      "• Variance and forecasting: analyse performance and model scenarios",
      "• Advisory: turn analysis into structured recommendations",
      "• Responsible use: confidentiality, liability and disclosure",
      "Each tool is used for what it does best: Gemini for workflow mapping and bookkeeping, Perplexity for cited tax research, Claude for long documents and client writing, and ChatGPT for variance analysis, forecasting and advisory.",
      "And it doesn’t stop when the course ends. You build your own AI Accounting Hub, a reusable library of prompts, workflows and resources for your next client engagement.",
      "No prior AI experience required."
    ],
    "includes": [
      "10 modules, about 6 hours of learning",
      "43 lessons with clear, practical guidance",
      "24 ready-to-use AI prompts for real accounting tasks",
      "10 hands-on “Your turn” tasks using realistic client data",
      "29 knowledge-check activities",
      "A reusable AI Accounting Hub of prompts and workflows",
      "A template for your practice’s AI usage policy",
      "Certificate of completion",
      "Access for 15 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "ai-pm": {
    "subtitle": "Turn AI into your secret weapon for product development. Discover. Strategise. Prioritise. Build. Launch. Grow. Learn the real product management frameworks (JTBD, Porter's Five Forces, RICE, Kano, PRDs, AARRR, OKRs and more) and use ChatGPT, Claude, Perplexity and Gemini at every stage of the product lifecycle.",
    "learn": [
      "Understand the full product lifecycle and what a product manager really owns",
      "Know which of the four AI tools to use for each product task",
      "Turn messy customer interview notes into clear insights, Jobs-to-Be-Done statements and evidence-based personas",
      "Research competitors with Perplexity and analyse markets with Porter's Five Forces",
      "Write a product vision with real substance, build a value proposition, and estimate TAM, SAM and SOM",
      "Prioritise features objectively with RICE, MoSCoW, the Kano Model and weighted scoring",
      "Draft PRDs, user stories with testable acceptance criteria, and story maps",
      "Plan a 5-day design sprint, scope a true MVP, and prepare for Agile ceremonies",
      "Build a go-to-market strategy, a phased beta rollout and a launch checklist",
      "Track growth with AARRR (Pirate Metrics), define a North Star Metric, and design A/B tests",
      "Write OKRs, clarify decision rights with RACI, build a Now-Next-Later roadmap, and test product-market fit with the Sean Ellis test",
      "Plan a responsible product sunset with a deprecation and migration plan",
      "Use AI responsibly with product data, and build your own reusable AI Product Hub"
    ],
    "sections": [
      {
        "title": "Module 1: Foundations — The Product Lifecycle & Your AI Toolkit",
        "lectures": [
          ["The stages every product moves through", 8],
          ["What a product manager really owns", 8],
          ["Your AI toolkit: four tools, four strengths", 7],
          ["Hands-on: match product tasks to the right tool", 7]
        ]
      },
      {
        "title": "Module 2: Discovery — Customer Interviews, JTBD & Personas",
        "lectures": [
          ["Turn messy interview notes into clear insights", 8],
          ["Jobs-to-Be-Done: what the customer is hiring you for", 8],
          ["Build an evidence-based persona with ChatGPT", 7],
          ["Hands-on: write a JTBD statement and persona", 7]
        ]
      },
      {
        "title": "Module 3: Discovery — Competitive Analysis with Porter's Five Forces",
        "lectures": [
          ["Research the current competitive landscape with Perplexity", 8],
          ["What Porter's Five Forces measures", 8],
          ["Direct, indirect and substitute competitors", 7],
          ["Hands-on: analyse a real competitive landscape", 7]
        ]
      },
      {
        "title": "Module 4: Strategy & Vision — Vision, Positioning & Market Sizing",
        "lectures": [
          ["Write a product vision with real substance", 8],
          ["Build a value proposition canvas with Claude", 8],
          ["Estimate TAM, SAM and SOM with Perplexity", 7],
          ["Hands-on: vision, value proposition and market size", 7]
        ]
      },
      {
        "title": "Module 5: Planning & Prioritisation — RICE, MoSCoW, KANO & Weighted Scoring",
        "lectures": [
          ["RICE: objective feature scoring", 7],
          ["MoSCoW: prioritising against a fixed deadline", 7],
          ["The Kano Model: what delights customers", 7],
          ["Build a visual weighted scoring matrix with Claude", 7],
          ["Hands-on: prioritise a real backlog", 7]
        ]
      },
      {
        "title": "Module 6: Definition — PRDs, User Stories & Story Mapping",
        "lectures": [
          ["Draft a PRD with clear boundaries", 8],
          ["Write user stories with testable acceptance criteria", 8],
          ["Build a visual user story map with Claude", 7],
          ["Hands-on: define a feature end to end", 7]
        ]
      },
      {
        "title": "Module 7: Design & Development — Design Sprints, MVP & Agile",
        "lectures": [
          ["Plan a 5-day design sprint", 8],
          ["Scope an MVP: minimal, not incomplete", 8],
          ["Prepare for sprint planning and backlog grooming", 7],
          ["Hands-on: scope an MVP and plan a sprint", 7]
        ]
      },
      {
        "title": "Module 8: Launch — GTM Strategy, Beta Rollouts & Checklists",
        "lectures": [
          ["Build a go-to-market strategy", 8],
          ["Plan a phased beta rollout to reduce risk", 8],
          ["A launch checklist covering sales and support enablement", 7],
          ["Hands-on: plan a launch end to end", 7]
        ]
      },
      {
        "title": "Module 9: Growth & Iteration — AARRR, North Star, A/B Testing",
        "lectures": [
          ["Map metrics onto the AARRR (Pirate Metrics) funnel", 7],
          ["Define a North Star Metric that reflects customer value", 7],
          ["Design an A/B test with ChatGPT", 7],
          ["The Build-Measure-Learn loop", 7],
          ["Hands-on: map growth and design an experiment", 7]
        ]
      },
      {
        "title": "Module 10: Alignment & Direction — OKRs, RACI & Roadmapping",
        "lectures": [
          ["Write OKRs that connect team work to strategy", 7],
          ["Clarify decision rights with a RACI matrix", 7],
          ["Product councils and Now-Next-Later roadmaps with Claude", 7],
          ["The Sean Ellis test for product-market fit", 7],
          ["Hands-on: align your team and roadmap", 7]
        ]
      },
      {
        "title": "Module 11: Sunset, Responsible AI & Your AI Product Hub",
        "lectures": [
          ["What belongs in a responsible product sunset", 10],
          ["Draft a deprecation and migration plan", 10],
          ["What should never go into an AI chat, and when to disclose AI use", 10],
          ["Final mission: build your reusable AI Product Hub", 10]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "No prior product management experience needed; every framework is explained from scratch",
      "A computer with a modern browser",
      "Free accounts for ChatGPT, Claude, Perplexity and Gemini"
    ],
    "audience": [
      "Product managers who want to work faster with AI",
      "Aspiring PMs preparing for their first product role or interviews",
      "Founders and startup teams who manage their own product",
      "Business analysts, designers and engineers moving into product management",
      "Students who want practical product management skills and frameworks"
    ],
    "description": [
      "Turn AI into your secret weapon for product development.",
      "Discover. Strategise. Prioritise. Build. Launch. Grow.",
      "Product management means making good decisions fast: understanding customers, sizing markets, choosing what to build, writing clear requirements, launching well and learning from the results. AI can speed up every one of those steps, but only if you know the frameworks behind them and use the right tool for each job.",
      "This course teaches both: real product management fundamentals and practical, hands-on AI use.",
      "One product. 11 modules. The complete product lifecycle.",
      "Customer Discovery → Product Strategy → Prioritisation → PRDs → MVP → Launch → Growth → Roadmapping → Sunset",
      "Frameworks you'll use: JTBD • Personas • Porter's Five Forces • Vision Statement • Value Proposition • TAM/SAM/SOM • RICE • MoSCoW • Kano • Weighted Scoring • PRD • User Stories • Story Mapping • Design Sprint • MVP • GTM • Beta Rollouts • AARRR • North Star Metric • A/B Testing • OKRs • RACI • Now-Next-Later Roadmap • Sean Ellis Test",
      "Each AI tool is used where it's strongest: ChatGPT for drafting and planning, Claude for visual canvases and maps, Perplexity for current market research, and Gemini alongside them.",
      "You finish with your own AI Product Hub, a reusable set of prompts and templates for your next product.",
      "Built for product managers and aspiring PMs. No prior AI experience required."
    ],
    "includes": [
      "11 modules, about 6 hours of learning",
      "44 lessons explaining each framework in plain language",
      "27 ready-to-use AI prompts for real product tasks",
      "11 hands-on \"Your turn\" tasks",
      "25+ knowledge-check activities",
      "20+ product management frameworks covered",
      "A reusable AI Product Hub of prompts and templates",
      "Certificate of completion",
      "Access for 28 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "ai-projects": {
    "subtitle": "Win your next project with AI. Charter. WBS. Gantt. RACI. Risk register. Reports. Change requests. Stakeholder updates. Learn the full project lifecycle, from initiation to closure, and use ChatGPT, Claude, Perplexity and Gemini to go from a blank page to a structured project document in minutes.",
    "learn": [
      "Understand the difference between managing tasks and managing a project",
      "Learn the core project vocabulary: stakeholder, deliverable, milestone, baseline, critical path and more",
      "Know which of the four AI tools to use for each project task",
      "Research feasibility with Perplexity, and draft a business case and project charter with ChatGPT",
      "Write a scope statement that says clearly what's in and what's out",
      "Create a visual Work Breakdown Structure (WBS) diagram with Claude",
      "Turn your WBS into a schedule with dependencies, find the critical path, and create a Gantt-style chart",
      "Set a baseline to measure progress against",
      "Balance the Triple Constraint (scope, time, cost) and plan budget and resources",
      "Build a visual RACI matrix, and understand Responsible vs Accountable",
      "Tell risks, issues and assumptions apart, and build a risk register",
      "Spot scope creep early and handle change requests properly",
      "Build QA and QC checklists, define KPIs, and understand what an SLA commits you to",
      "Turn messy meeting notes into clear stakeholder updates for different audiences",
      "Build a reusable weekly report template with Gemini in Google Workspace",
      "Write a lessons-learned document, and build your own reusable AI Project Hub"
    ],
    "sections": [
      {
        "title": "Module 1: Foundations — Project vs Task Management & Your AI Toolkit",
        "lectures": [
          ["Task management vs project management", 8],
          ["Five core terms: project, stakeholder, deliverable, milestone, task", 8],
          ["Your AI toolkit: four tools, four strengths", 7],
          ["Hands-on: match project tasks to the right tool", 7]
        ]
      },
      {
        "title": "Module 2: Initiating — Charter, Business Case & Feasibility",
        "lectures": [
          ["Decide whether the project should happen at all", 6],
          ["Research feasibility with Perplexity", 6],
          ["What a business case contains", 6],
          ["Draft a project charter with ChatGPT", 6],
          ["Hands-on: initiate a real project", 6]
        ]
      },
      {
        "title": "Module 3: Planning — Scope & Work Breakdown Structure",
        "lectures": [
          ["Write a scope statement: what's in and what's out", 6],
          ["What a WBS is", 6],
          ["Generate a visual WBS diagram with Claude", 6],
          ["From WBS to deliverables and tasks", 6],
          ["Hands-on: build a scope statement and WBS", 6]
        ]
      },
      {
        "title": "Module 4: Planning — Schedule, Critical Path & Baseline",
        "lectures": [
          ["Turn tasks into a schedule with dependencies", 6],
          ["The critical path: the sequence that sets your deadline", 6],
          ["Create a Gantt-style chart with Claude", 6],
          ["Set a baseline", 6],
          ["Hands-on: build a schedule and baseline", 6]
        ]
      },
      {
        "title": "Module 5: Planning — Budget, Resources, Triple Constraint & RACI",
        "lectures": [
          ["The Triple Constraint: scope, time and cost", 6],
          ["Plan resources and budget with ChatGPT", 6],
          ["Build a visual RACI matrix with Claude", 6],
          ["Responsible vs Accountable", 6],
          ["Hands-on: build a budget plan and RACI matrix", 6]
        ]
      },
      {
        "title": "Module 6: Planning — Risks, Assumptions & Issues",
        "lectures": [
          ["Risk vs issue vs assumption", 6],
          ["Research current risk factors with Perplexity", 6],
          ["Build a risk register with ChatGPT", 6],
          ["Find the hidden assumptions driving your plan", 6],
          ["Hands-on: build a risk register and assumption list", 6]
        ]
      },
      {
        "title": "Module 7: Executing & Controlling — Change Requests & Scope Creep",
        "lectures": [
          ["Spot scope creep before it takes over", 6],
          ["Handle change requests through proper change control", 6],
          ["Compare progress against your baseline with ChatGPT", 6],
          ["When to say yes, and when to push back", 6],
          ["Hands-on: evaluate a change request and check progress", 6]
        ]
      },
      {
        "title": "Module 8: Monitoring — Quality (QA vs QC), KPIs & SLAs",
        "lectures": [
          ["Quality Assurance vs Quality Control", 6],
          ["Build QA and QC checklists with ChatGPT", 6],
          ["Define KPIs that measure project success", 6],
          ["What an SLA commits you to", 6],
          ["Hands-on: build your quality and success framework", 6]
        ]
      },
      {
        "title": "Module 9: Communicating & Reporting Progress",
        "lectures": [
          ["Turn messy meeting notes into a clear stakeholder summary", 6],
          ["Reframe one update for different audiences", 6],
          ["Build a reusable weekly report with Gemini in Google Workspace", 6],
          ["What a report template can't replace", 6],
          ["Hands-on: two stakeholder updates and a report template", 6]
        ]
      },
      {
        "title": "Module 10: Closing — Final Delivery, Lessons Learned & Your AI Hub",
        "lectures": [
          ["What belongs in project closure", 10],
          ["Write a lessons-learned document with ChatGPT", 10],
          ["What should never go into an AI chat, and when to disclose AI use", 10],
          ["Final mission: build your reusable AI Project Hub", 10]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "No prior project management training needed; every term is explained from scratch",
      "A computer with a modern browser",
      "Free accounts for ChatGPT, Claude, Perplexity and Gemini",
      "A Google account for the Google Workspace reporting module"
    ],
    "audience": [
      "Project managers who want to create project documents faster with AI",
      "Team leads and coordinators who manage projects without formal PM training",
      "Aspiring project managers who want to learn the fundamentals and AI tools together",
      "Business owners and consultants running client projects",
      "Professionals preparing for project management roles"
    ],
    "description": [
      "Win your next project with AI.",
      "Charter. WBS. Gantt. RACI. Risk register. Reports. Change requests. Stakeholder updates.",
      "Project managers create, analyse, update, explain and communicate all of this, again and again. Now imagine having AI help you go from a blank page to a structured project document in minutes.",
      "This course teaches you how to apply ChatGPT, Claude, Perplexity and Gemini to real project management work:",
      "Initiation → Planning → Scheduling → Risk → Resources → Change Control → Quality → Reporting → Communication → Closure",
      "You won't learn through disconnected examples. You follow one complete project from initiation to closure, and build your own reusable AI Project Hub along the way.",
      "Each tool is used where it's strongest: Perplexity for current research, ChatGPT for drafting documents, Claude for visual WBS, Gantt and RACI diagrams, and Gemini for reports in Google Workspace.",
      "You also learn the real project management fundamentals behind every document, so you understand what you're asking AI to create and can judge whether it's right.",
      "Stop treating AI like a chatbot. Start using it like a project management tool."
    ],
    "includes": [
      "10 modules, about 5 hours of learning",
      "37 lessons explaining every project management term in plain language",
      "21 ready-to-use AI prompts for real project documents",
      "10 hands-on \"Your turn\" tasks",
      "25+ knowledge-check activities",
      "Visual WBS, Gantt and RACI diagrams created with Claude",
      "A reusable weekly report template",
      "A reusable AI Project Hub of prompts and templates",
      "Certificate of completion",
      "Access for 28 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "gads-mastery": {
    "subtitle": "AI can help build your campaign. But can you tell if it's right? In 28 days, go from complete beginner to building three complete Google Ads campaigns (Search, Performance Max and Demand Gen), from research to launch to optimisation. Use AI at every step, always following one rule: AI suggests, you verify, real Google Ads data decides.",
    "learn": [
      "Understand the metrics behind every campaign, traced through a real ₹10,000 example",
      "Build a complete advertising brief for your business with an AI interview",
      "Understand customer psychology and the four types of search intent",
      "Research competitors with the Google Ads Transparency Center, and know the difference between real data and estimates from SpyFu and Semrush",
      "Audit your landing page before spending on ads",
      "Set up conversion tracking: native tag vs GA4 import, primary vs secondary conversions, and Enhanced Conversions",
      "Research keywords in Google Keyword Planner, and master match types and negative keywords",
      "Structure ad groups and write Responsive Search Ads within character limits",
      "Add sitelinks, callouts and structured snippets",
      "Choose budgets, bid strategies and targeting",
      "Build Performance Max asset groups with images, video and audience signals, and understand what you control vs what Google's AI controls",
      "Create Demand Gen campaigns that create demand, not just capture it",
      "Run a pre-launch audit and launch each campaign",
      "Manage the first 7 days and the learning phase",
      "Use the Search Terms report and AI to find wasted spend",
      "Diagnose underperforming campaigns with a 6-question Performance Doctor method",
      "Reallocate budget across campaigns and scale what works",
      "Build a 30-day optimisation plan"
    ],
    "sections": [
      {
        "title": "Day 1: Welcome — Google Ads Without the Confusion",
        "lectures": [
          ["Your 28-day roadmap", 10],
          ["AI suggests, you verify, data decides", 10],
          ["The metrics behind every campaign", 10],
          ["A ₹10,000 campaign traced through", 10]
        ]
      },
      {
        "title": "Day 2: Build Your AI Business Advertising Brief",
        "lectures": [
          ["Why the brief matters most", 14],
          ["What a complete brief covers", 13],
          ["Let AI interview you instead of filling a blank form", 13]
        ]
      },
      {
        "title": "Day 3: Customer Psychology & Search Intent",
        "lectures": [
          ["Why search behaviour comes before keywords", 12],
          ["The psychology behind a search", 12],
          ["The four search intent categories", 11]
        ]
      },
      {
        "title": "Day 4: AI Competitor Intelligence",
        "lectures": [
          ["Real competitor ads in the Google Ads Transparency Center", 20],
          ["SpyFu, Semrush and Keyword Tool.io: useful estimates, not facts", 20]
        ]
      },
      {
        "title": "Day 5: AI Landing Page Audit",
        "lectures": [
          ["Why the landing page comes before keywords", 20],
          ["Three kinds of audit findings", 20]
        ]
      },
      {
        "title": "Day 6: Conversion Tracking Setup",
        "lectures": [
          ["Native tag vs GA4 import", 12],
          ["Primary vs secondary conversions", 12],
          ["Enhanced Conversions", 11]
        ]
      },
      {
        "title": "Day 7: Is Search Right for You? + Keyword Planner",
        "lectures": [
          ["Is Search Right for You? + Keyword Planner", 40]
        ]
      },
      {
        "title": "Day 8: Keywords, Match Types & Negatives",
        "lectures": [
          ["Keywords, Match Types & Negatives", 45]
        ]
      },
      {
        "title": "Day 9: Ad Groups & Campaign Architecture",
        "lectures": [
          ["Ad Groups & Campaign Architecture", 45]
        ]
      },
      {
        "title": "Day 10: Writing Responsive Search Ads",
        "lectures": [
          ["RSA structure, character counts and what \"Ad Strength\" really means", 50]
        ]
      },
      {
        "title": "Day 11: Sitelinks, Callouts & Structured Snippets",
        "lectures": [
          ["Sitelinks, Callouts & Structured Snippets", 35]
        ]
      },
      {
        "title": "Day 12: Budget, Bidding & Targeting",
        "lectures": [
          ["Budget, Bidding & Targeting", 45]
        ]
      },
      {
        "title": "Day 13: Pre-Launch Audit & Launch",
        "lectures": [
          ["Milestone: your Search campaign goes live", 45]
        ]
      },
      {
        "title": "Day 14: Is Performance Max Right for You? + Asset Groups",
        "lectures": [
          ["Is Performance Max Right for You? + Asset Groups", 40]
        ]
      },
      {
        "title": "Day 15: Image & Video Creative",
        "lectures": [
          ["Image & Video Creative", 45]
        ]
      },
      {
        "title": "Day 16: Audience Signals, Budget & Bidding",
        "lectures": [
          ["Audience Signals, Budget & Bidding", 40]
        ]
      },
      {
        "title": "Day 17: What You Control vs What Google's AI Controls",
        "lectures": [
          ["What You Control vs What Google's AI Controls", 30]
        ]
      },
      {
        "title": "Day 18: Pre-Launch Audit & Launch",
        "lectures": [
          ["Milestone: your Performance Max campaign goes live", 40]
        ]
      },
      {
        "title": "Day 19: Is Demand Gen Right for You? Capture vs Create Demand",
        "lectures": [
          ["Is Demand Gen Right for You? Capture vs Create Demand", 40]
        ]
      },
      {
        "title": "Day 20: Demand Gen Creative: Images & Video",
        "lectures": [
          ["Demand Gen Creative: Images & Video", 45]
        ]
      },
      {
        "title": "Day 21: Budget, Bidding & Targeting",
        "lectures": [
          ["Budget, Bidding & Targeting", 40]
        ]
      },
      {
        "title": "Day 22: Pre-Launch Audit & Launch",
        "lectures": [
          ["Milestone: three complete campaigns", 40]
        ]
      },
      {
        "title": "Day 23: The First 7 Days & the Learning Phase",
        "lectures": [
          ["The First 7 Days & the Learning Phase", 35]
        ]
      },
      {
        "title": "Day 24: AI Search Terms Optimiser",
        "lectures": [
          ["AI Search Terms Optimiser", 40]
        ]
      },
      {
        "title": "Day 25: AI Performance Doctor — Six Diagnostic Questions",
        "lectures": [
          ["AI Performance Doctor — Six Diagnostic Questions", 45]
        ]
      },
      {
        "title": "Day 26: Troubleshooting Lab: \"My Ads Are Not Working\"",
        "lectures": [
          ["Troubleshooting Lab: \"My Ads Are Not Working\"", 40]
        ]
      },
      {
        "title": "Day 27: Budget Reallocation & Scaling",
        "lectures": [
          ["Budget Reallocation & Scaling", 40]
        ]
      },
      {
        "title": "Day 28: 30-Day Optimisation Plan + Capstone Challenge",
        "lectures": [
          ["A 3-hour capstone challenge", 45],
          ["Final assessment: 20 knowledge questions, 10 scenarios, 5 optimisation cases and applied exercises", 45]
        ]
      }
    ],
    "requirements": [
      "No Google Ads experience needed",
      "A computer with a modern browser",
      "A Google account and a Google Ads account (free to create)",
      "A free ChatGPT account (or another AI assistant)",
      "A website or landing page for your business is strongly recommended",
      "Google Ads itself is free; you only pay for the ad budget you choose to spend. You can complete the course and build every campaign without launching paid ads"
    ],
    "audience": [
      "Complete beginners to Google Ads",
      "Small business owners who want to run their own Google Ads without wasting budget",
      "Marketers adding Google Ads and AI to their skills",
      "Freelancers who want to manage Google Ads for clients",
      "Business owners currently paying an agency who want to understand what's being done"
    ],
    "description": [
      "AI can help build your campaign. But can you tell if it's right?",
      "You don't need to start as a Google Ads expert. You start with the basics. Then you build, one campaign at a time:",
      "Foundation → Search → Performance Max → Demand Gen → Optimisation",
      "Every day you have Google Ads open in one tab and an AI assistant in the other, and you build real campaigns for your own business while you learn. Each day updates your Campaign Master workbook, so by Day 28 you have three complete campaigns and a 30-day optimisation plan.",
      "Throughout the course, one rule:",
      "• AI SUGGESTS. YOU VERIFY. REAL GOOGLE ADS DATA DECIDES.",
      "AI can draft keywords, ad copy and analysis in seconds. But it doesn't know your account's real numbers unless you give them to it, and it should never invent a metric. This course teaches you to use AI's speed without trusting it blindly.",
      "28 days. 389 screens. 3 campaign types. 101 practical prompts.",
      "Stop watching random Google Ads tutorials. Build the skill systematically."
    ],
    "includes": [
      "28 daily lessons, about 20 hours of learning in total",
      "389 interactive screens",
      "3 complete campaign types: Search, Performance Max and Demand Gen",
      "101 practical AI prompts",
      "33 hands-on tasks in Google Ads and AI tools",
      "90+ knowledge-check activities",
      "A Campaign Master workbook you update every day",
      "A 3-hour capstone challenge and a 4-part final assessment",
      "A troubleshooting lab for \"my ads are not working\"",
      "Certificate of completion",
      "Access for 28 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "ai-seo": {
    "subtitle": "Want to use AI to improve your SEO? Learn how search engines actually work and build a complete, repeatable SEO system for your business: keywords, content planning, on-page optimisation, technical fixes, backlinks, user experience, local SEO and measurement. Use AI at every step, with free and low-cost tools.",
    "learn": [
      "Understand search intent and Google's three ranking factors: relevance, authority and experience",
      "See where AI helps in SEO, and where it doesn't",
      "Build a 3-month AI-assisted SEO strategy for your business",
      "Find keywords that convert, and avoid the \"vanity keyword\" trap",
      "Discover real search questions with AnswerThePublic, then group keywords by intent and judge difficulty with ChatGPT",
      "Plan content Google already rewards, using Frase data and ChatGPT",
      "Write page titles and meta descriptions that earn clicks, with the right heading structure and links",
      "Generate an optimised article with SEOWriting.ai",
      "Crawl your site with Screaming Frog, find technical problems and plan fixes",
      "Understand what makes a backlink valuable, analyse your backlinks in Semrush, and track brand mentions with Brand24",
      "Draft outreach and digital PR pitches with ChatGPT",
      "Measure Core Web Vitals with PageSpeed Insights, and improve mobile speed and accessibility",
      "Rank in local search with a complete Google Business Profile",
      "Track organic traffic in Semrush, find patterns with DeepSeek, and plan content updates when traffic drops",
      "Build your SEO workflow in Notion, with templates and a monthly maintenance routine"
    ],
    "sections": [
      {
        "title": "Module 1: What Is SEO, and Where Does AI Fit In?",
        "lectures": [
          ["Why people find your competitors instead of you", 4],
          ["Search intent explained", 4],
          ["Google's three ranking factors", 4],
          ["Why SEO keeps paying off long after you publish", 4],
          ["How AI changes SEO", 3],
          ["Hands-on: build your own 3-month SEO strategy", 3]
        ]
      },
      {
        "title": "Module 2: Find Keywords That Convert",
        "lectures": [
          ["Search volume, and the vanity keyword trap", 7],
          ["Discover real search questions with AnswerThePublic", 6],
          ["Group keywords into clusters by intent", 6],
          ["Judge keyword difficulty with ChatGPT", 6]
        ]
      },
      {
        "title": "Module 3: Build Content Plans That Drive Traffic",
        "lectures": [
          ["Three questions to answer before you write", 6],
          ["Use Frase to see which topics Google already rewards", 6],
          ["Plan structure and depth with ChatGPT", 5],
          ["Hands-on: build your own content plan", 5]
        ]
      },
      {
        "title": "Module 4: Optimise Content Google Rewards — On-Page SEO",
        "lectures": [
          ["Page titles that earn clicks", 5],
          ["Meta descriptions", 5],
          ["Heading hierarchy", 5],
          ["Internal and external links", 5],
          ["Hands-on: generate an optimised article with SEOWriting.ai", 5]
        ]
      },
      {
        "title": "Module 5: Fix What Breaks Your Rankings — Technical SEO",
        "lectures": [
          ["Which technical issues matter most, and which can wait", 7],
          ["Crawl your site with Screaming Frog", 7],
          ["Find root causes and build a prevention plan with ChatGPT", 6]
        ]
      },
      {
        "title": "Module 6: Build Authority Outside Your Website",
        "lectures": [
          ["What makes a backlink valuable", 6],
          ["Analyse your backlink profile in Semrush", 6],
          ["Track brand mentions with Brand24", 5],
          ["Digital PR and outreach drafts with ChatGPT", 5]
        ]
      },
      {
        "title": "Module 7: Optimise for People — User Experience",
        "lectures": [
          ["How visitor behaviour affects rankings", 6],
          ["Measure Core Web Vitals with PageSpeed Insights, and diagnose them with Gemini", 6],
          ["Compare mobile vs desktop scores", 5],
          ["Improve accessibility with Claude", 5]
        ]
      },
      {
        "title": "Module 8: Rank Where Your Customers Are — Local SEO",
        "lectures": [
          ["The three local ranking factors", 8],
          ["Build a complete Google Business Profile with Claude", 7],
          ["Mobile SEO for on-the-go local searches", 7]
        ]
      },
      {
        "title": "Module 9: Measure, Learn & Improve",
        "lectures": [
          ["Track organic traffic in Semrush", 7],
          ["Find traffic patterns with DeepSeek", 7],
          ["Plan content updates when traffic drops", 6]
        ]
      },
      {
        "title": "Module 10: Build a System That Grows with You",
        "lectures": [
          ["Map your complete SEO workflow in Notion", 5],
          ["Automate repetitive tasks", 5],
          ["Create reusable templates", 5],
          ["A monthly maintenance routine", 5]
        ]
      }
    ],
    "requirements": [
      "No SEO or AI experience needed",
      "A computer with a modern browser",
      "Your own website (or a site you manage) to practise on",
      "Free accounts: ChatGPT, Claude, Gemini, DeepSeek, Notion, PageSpeed Insights, Google Business Profile",
      "Some SEO tools are paid or limited on their free plans: Semrush, Frase and Brand24 offer free trials or limited free use, and Screaming Frog is free for up to 500 pages. You can follow every lesson without buying anything"
    ],
    "audience": [
      "Business owners who want their website found on Google without hiring an agency",
      "Marketers adding SEO and AI to their skills",
      "Freelancers offering SEO services",
      "Bloggers and content creators who want more organic traffic",
      "Complete beginners to SEO"
    ],
    "description": [
      "Your customers are searching. Are they finding you, or your competitors?",
      "AI for SEO teaches you to bring AI into practical SEO, from research and search intent to content, technical fixes, authority, user experience, local search and ongoing improvement.",
      "Move beyond random SEO tasks and build a repeatable workflow:",
      "• Search → Research → Plan → Create → Optimise → Analyse → Improve",
      "What you'll cover:",
      "• Keyword and search intent research",
      "• Content planning and creation",
      "• On-page SEO and content optimisation",
      "• Technical SEO fixes",
      "• Backlinks, brand mentions and digital PR",
      "• User experience and Core Web Vitals",
      "• Local SEO and Google Business Profile",
      "• Measurement and content updates",
      "• A repeatable monthly SEO system",
      "The goal isn't simply to generate more content. It's to understand what to create, why, how to optimise it, and what to improve next.",
      "Every module includes ready-to-use AI prompts and a hands-on task on your own website, so you finish with a working SEO system, not just notes.",
      "Make your SEO workflow ready for the AI era."
    ],
    "includes": [
      "10 modules, about 4 hours of learning",
      "42 lessons in plain language",
      "25 ready-to-use AI prompts with example results",
      "10 hands-on \"Your turn\" tasks on your own website",
      "Step-by-step guides for 10 SEO and AI tools",
      "30+ knowledge-check activities",
      "Reusable SEO templates and a monthly maintenance routine",
      "Certificate of completion",
      "Access for 15 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "gads-setup": {
    "subtitle": "Learn Google Ads by actually building it. Never opened Google Ads before? Don't know what CPC, CTR, CPA or ROAS mean? That's exactly where this course starts. This is a literal, click-by-click guide that explains every screen, every setting and every number in plain language, with AI help at every step. It covers all seven campaign types: Search, Performance Max, Demand Gen, Display, Shopping, Video and App.",
    "learn": [
      "Know which Google website does what: Google Search, your free Business Profile, and Google Ads",
      "Create your Google Ads account and find your way around every section of the screen",
      "Avoid the auto-apply recommendations that can quietly change your campaigns",
      "Understand the campaign → ad group → ad structure",
      "Read the numbers in plain language: impressions, clicks, CTR, CPC, conversions, CPA and ROAS",
      "Set up billing once, and set budgets per campaign",
      "Choose between the 7 objectives and the 7 campaign types",
      "Build a complete Search campaign line by line: networks, locations, languages and bidding",
      "Choose keywords, match types and negative keywords",
      "Write ads within character limits, with strong headlines and no claims you can't prove",
      "Add sitelinks, callouts, structured snippets, images, logos and phone numbers, and use pinning correctly",
      "Run a pre-launch checklist and publish",
      "Know what to do, and what to avoid, for a higher CTR and lower CPC",
      "Read your first week of results, and know when a number is worth acting on",
      "Build Performance Max campaigns with asset groups, audience signals and budget settings",
      "Build Demand Gen campaigns with images, carousels, video and a testing matrix",
      "Understand the current status of Display campaigns",
      "Build Shopping campaigns with Merchant Center and good product data",
      "Build YouTube Video campaigns and App campaigns",
      "Use ChatGPT at every stage for keywords, ad copy, checks and analysis"
    ],
    "sections": [
      {
        "title": "Getting Started",
        "lectures": [
          ["Creating Your Account", 20],
          ["The Google Ads Screen, Explained", 20],
          ["The Campaign Tree", 15],
          ["Reading the Numbers", 25],
          ["Billing, Set Up Once", 15],
          ["The 7 Objectives", 20],
          ["The 7 Campaign Types, at a Glance", 20]
        ]
      },
      {
        "title": "Search Campaign, Start to Finish",
        "lectures": [
          ["Starting the Campaign", 20],
          ["Campaign Settings, Line by Line", 30],
          ["Bidding, Explained Simply", 25],
          ["Ad Groups & Keywords", 30],
          ["Writing the Ad", 35],
          ["Sitelinks, Callouts & Structured Snippets", 30],
          ["Images, Logos & Calls", 25],
          ["Before You Publish", 20],
          ["What to Do / Not Do for Max CTR, Low CPC", 25],
          ["Reading Your First Week", 20]
        ]
      },
      {
        "title": "Performance Max",
        "lectures": [
          ["Starting the Campaign", 25],
          ["The Asset Group: Text", 30],
          ["Images and Video", 25],
          ["Audience Signals", 20],
          ["Budget & Bidding", 20],
          ["What You Control vs What Google's AI Controls", 20],
          ["Pre-Launch Audit", 20],
          ["Reading Your Results", 20]
        ]
      },
      {
        "title": "Demand Gen",
        "lectures": [
          ["Starting the Campaign", 25],
          ["Asset Group Text", 25],
          ["Images, Carousel and Video", 25],
          ["Budget, Bidding, Targeting & Testing Matrix", 25],
          ["Pre-Launch Audit & Reading Results", 25]
        ]
      },
      {
        "title": "Display",
        "lectures": [
          ["Display: The Honest, Current Status", 20]
        ]
      },
      {
        "title": "Shopping",
        "lectures": [
          ["Starting the Campaign", 25],
          ["Product Data Quality", 25],
          ["Linking Merchant Center to Google Ads and Building the Campaign", 25],
          ["Pre-Launch Audit & Reading Results", 20]
        ]
      },
      {
        "title": "Video / YouTube",
        "lectures": [
          ["Starting the Campaign", 25],
          ["Ad Formats and Linking Your Video", 25],
          ["Budget, Bidding & Targeting", 20],
          ["Pre-Launch Audit & Reading Results", 20]
        ]
      },
      {
        "title": "App",
        "lectures": [
          ["Starting the Campaign", 25],
          ["Asset Group: Text, Images and Video", 25],
          ["Budget & Bidding", 20],
          ["Pre-Launch Audit & Reading Results", 20]
        ]
      }
    ],
    "requirements": [
      "No Google Ads or marketing experience needed",
      "A computer with a modern browser",
      "A Google account and a Google Ads account (free to create)",
      "A free ChatGPT account",
      "A website or landing page is recommended. Local businesses should also set up a free Google Business Profile",
      "For Shopping campaigns: a Google Merchant Center account and product data. For Video campaigns: a YouTube channel. For App campaigns: a published app",
      "Google Ads is free to use; you only pay for the ad budget you choose to spend"
    ],
    "audience": [
      "Absolute beginners who have never opened Google Ads",
      "Small business owners (salons, clinics, shops, coaching institutes) who want to run their own ads",
      "Ecommerce sellers who want Shopping campaigns",
      "YouTubers and app owners who want Video or App campaigns",
      "Marketers and freelancers who want a complete reference for every campaign type"
    ],
    "description": [
      "Learn Google Ads by actually building it.",
      "Never opened Google Ads before? Don't know what CPC, CTR, CPA or ROAS mean? That's exactly where this course starts.",
      "Most Google Ads courses assume you already know your way around the screen. This one doesn't. It explains every screen, every setting and every number in plain language, with real screenshots and \"look at your screen right now\" steps, so you always know exactly where to click and why.",
      "You start by building one complete Search campaign, line by line. Then you build every other campaign type Google Ads offers:",
      "Search • Performance Max • Demand Gen • Display • Shopping • Video • App",
      "At every stage, AI helps you work faster, finding keywords, writing ad copy, checking your setup and analysing results, while one principle stays at the centre:",
      "AI SUGGESTS → YOU VERIFY → REAL GOOGLE ADS DATA DECIDES",
      "Your journey:",
      "• Account → Screen → Numbers → Billing → Objectives → Build → Publish → Read results → Every campaign type",
      "Don't just learn which button to click. Learn what every setting does, so you can build any campaign with confidence."
    ],
    "includes": [
      "43 short modules, about 16.5 hours of learning (15–35 minutes each)",
      "188 lessons with real screenshots and \"look at your screen right now\" steps",
      "All 7 Google Ads campaign types covered",
      "38 ready-to-use AI prompts for each stage",
      "40 hands-on tasks in your own Google Ads account",
      "85+ knowledge-check activities",
      "Pre-launch checklists for every campaign type",
      "Certificate of completion",
      "Access for 28 days"
    ],
    "level": "Absolute beginner",
    "language": "English"
  },
  "nocode-web": {
    "subtitle": "Build websites, apps and AI-powered products without becoming a programmer. Have an idea but don't know how to code? Build a real website with Lovable and a real app with Bolt.new, from a blank page to design, testing, AI features, automation, launch and improvement. Then learn to price and sell this skill to clients.",
    "learn": [
      "Understand what \"no-code\" really means, and why it works now",
      "Define your website's purpose, audience and call to action with ChatGPT",
      "Build a multi-page website draft with Lovable from a plain-English description",
      "Give your website a visual identity with a mascot or brand image from Leonardo AI",
      "Map the visitor journey and set up free vs paid (gated) content",
      "Plan your app's screens, actions and data, then build a working app with Bolt.new",
      "Build a dashboard, an interactive lesson or activity experience, and user accounts that save progress",
      "Test your app on desktop and mobile, and link your website and app together",
      "Work on a realistic client brief: run a UX audit, design onboarding and add micro-interactions",
      "Publish and hand over a client app professionally",
      "Add AI assistant features to your products, with clear guardrails",
      "Connect your app to other tools with Zapier webhooks",
      "Price client work with three pricing models, and write a proposal with ChatGPT",
      "Connect a custom domain, write SEO metadata and run a launch checklist",
      "Track performance with Google Analytics and fix bottlenecks with AI",
      "Build a 30-day improvement roadmap and a freelance playbook"
    ],
    "sections": [
      {
        "title": "Module 1: Why You Don't Need to Code Anymore",
        "lectures": [
          ["From \"I have an idea\" to a real product", 4],
          ["What no-code really means", 4],
          ["The full chain of what you'll build", 4]
        ]
      },
      {
        "title": "Module 2: Define Your Website's Purpose with ChatGPT",
        "lectures": [
          ["Purpose, audience and action: what every website needs first", 6],
          ["Write a specific, AI-friendly prompt", 6],
          ["Hands-on: define your own website", 6]
        ]
      },
      {
        "title": "Module 3: Build Your First Website Draft with Lovable",
        "lectures": [
          ["How Lovable turns text into a real website", 6],
          ["Write a structured first prompt and refine it", 6],
          ["Pages, components and navigation", 5],
          ["Hands-on: generate your draft and add a second page", 5]
        ]
      },
      {
        "title": "Module 4: Give Your Website a Visual Identity",
        "lectures": [
          ["Why visual identity makes a draft feel real", 7],
          ["Create a mascot or brand concept with ChatGPT and Leonardo AI", 7],
          ["Apply it inside Lovable", 6]
        ]
      },
      {
        "title": "Module 5: Design the Visitor Journey & Add Subscriptions",
        "lectures": [
          ["Map the visitor journey with ChatGPT", 6],
          ["Simplify navigation to match it", 6],
          ["Set up free vs paid (gated) content", 6]
        ]
      },
      {
        "title": "Module 6: Define and Generate Your App with Bolt.new",
        "lectures": [
          ["Why an app isn't just a smaller website", 7],
          ["Define your app's screens, actions and data", 7],
          ["Hands-on: generate your first app with Bolt.new", 6]
        ]
      },
      {
        "title": "Module 7: Dashboard, Lesson Experience & Accounts",
        "lectures": [
          ["A dashboard that tells users what to do next", 8],
          ["Build the core interactive experience", 7],
          ["Add user accounts so progress saves", 7]
        ]
      },
      {
        "title": "Module 8: Test Your App & Connect It to Your Website",
        "lectures": [
          ["Walk the full user flow on desktop and mobile", 5],
          ["Link your website and app", 5],
          ["What to check before calling it done", 5]
        ]
      },
      {
        "title": "Module 9: Design for a Client — Ux Audit & Onboarding",
        "lectures": [
          ["Turn a client brief into an app structure", 7],
          ["Run a UX audit to find usability problems", 7],
          ["Design a short onboarding flow", 6]
        ]
      },
      {
        "title": "Module 10: Screen Placement, Micro-Interactions & Handoff",
        "lectures": [
          ["Which screens belong in the main navigation", 6],
          ["Micro-interactions that confirm actions worked", 6],
          ["Publish and hand the app over to your client", 6]
        ]
      },
      {
        "title": "Module 11: Add AI Features to Your Products",
        "lectures": [
          ["Spot where a product could respond, assist or act", 7],
          ["Add an AI assistant feature to each product", 7],
          ["The one rule for every AI feature", 6]
        ]
      },
      {
        "title": "Module 12: Automate with Zapier & Set Guardrails",
        "lectures": [
          ["AI features vs background automations", 7],
          ["Connect your app to other tools with a Zapier webhook", 7],
          ["Define and build guardrails for every AI feature", 6]
        ]
      },
      {
        "title": "Module 13: Price Your Work & Write a Proposal",
        "lectures": [
          ["Three pricing models for client work", 5],
          ["Choose the right model for each client", 5],
          ["Draft a professional proposal with ChatGPT", 5]
        ]
      },
      {
        "title": "Module 14: Domains, SEO & the Launch Checklist",
        "lectures": [
          ["Domains and hosting explained", 5],
          ["Connect a custom domain", 5],
          ["Write SEO metadata for every page", 5],
          ["Run the full launch checklist", 5]
        ]
      },
      {
        "title": "Module 15: Track Performance & Fix Bottlenecks",
        "lectures": [
          ["Choose the right metrics for your product", 8],
          ["Set up Google Analytics", 7],
          ["Find and fix a bottleneck with AI", 7]
        ]
      },
      {
        "title": "Module 16: Your Full Build Recap & Freelance Playbook",
        "lectures": [
          ["Everything you built, traced end to end", 7],
          ["Build a 30-day iteration roadmap", 7],
          ["Pitch and price this skill as freelance work", 6]
        ]
      }
    ],
    "requirements": [
      "No coding experience needed",
      "A computer with a modern browser",
      "Free accounts: ChatGPT, Lovable, Leonardo AI, Bolt.new, Zapier and Google Analytics. Free plans cover the course, within their daily or monthly limits",
      "Optional costs: a custom domain (about US$10–15 a year). Connecting a custom domain in Lovable and some Zapier features, such as webhooks, may need paid plans. Check each tool's current pricing"
    ],
    "audience": [
      "Complete beginners with an idea for a website or app",
      "Students and freshers who want portfolio projects",
      "Career switchers moving into digital product roles",
      "Entrepreneurs who want to build and test products themselves",
      "Future freelancers who want to offer website and app building as a paid service"
    ],
    "description": [
      "Have an idea but don't know how to code?",
      "For years, turning an idea into a digital product meant learning to program or paying someone to build it for you. AI and no-code tools are changing that. Today you can start with an idea and turn it into a working:",
      "Website",
      "App",
      "Dashboard",
      "AI-powered product",
      "Automated workflow",
      "This is a practical, build-focused course. You don't watch someone else build. You build, one module at a time, each step using what you made in the step before.",
      "Idea → Build → Design → Test → Automate → Launch → Improve",
      "You'll build your own website with Lovable and your own app with Bolt.new, then take on a realistic client project with a UX audit, onboarding and a professional handoff. You'll add AI features and Zapier automations, launch with a custom domain and SEO, and track and improve performance with Google Analytics.",
      "And because this is a skill people pay for, you'll also learn to price your work, write proposals and pitch it as freelance work:",
      "Build → Show → Propose → Sell",
      "Whether you're a student, working professional, marketer, entrepreneur, freelancer, or someone with an idea you've been waiting to build, this course gives you a practical path to working digital products.",
      "Stop waiting for the \"right time\" to learn coding. Start building now."
    ],
    "includes": [
      "16 modules, about 5 hours of learning",
      "35 lessons in plain language",
      "26 ready-to-use AI prompts with example results",
      "20 hands-on \"Your turn\" tasks",
      "3 real builds: your own website, your own app, and a client app",
      "20+ knowledge-check activities",
      "A launch checklist, a proposal template and a 30-day roadmap",
      "Certificate of completion",
      "Access for 20 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "film-1": {
    "subtitle": "Want to create better AI films? Don't start with video generation. Start with the AI brain behind it. Learn how large language models work, master proven prompting techniques, build your own Gemini Gem agent step by step, and use Gemini and ChatGPT for content, apps and AI advertising. This is the foundation for every AI image, video and film you'll create next.",
    "learn": [
      "Understand what a large language model (LLM) is: architecture, model sizes and training, in plain language",
      "Know which AI to use for which job: ChatGPT for creative writing, Claude for long-form analysis, DeepSeek for reasoning, Perplexity for real-time research",
      "Tell the difference between AI, LLMs and prompts",
      "Use four proven prompting techniques: role-based, few-shot, reverse prompting and chain-of-thought",
      "Know what LLMs can and can't do, so you don't trust them blindly",
      "Use a 3-step business framework (gather resources, structure content, automate tasks) for creative and business work",
      "Build a knowledge base for your niche with DeepSeek and Perplexity",
      "Build your own Gemini Gem agent that knows what to say and how to say it",
      "Follow a complete hands-on demo: building an Insurance Advisor Gem, from research to finished marketing content",
      "Explore the Gemini ecosystem: chat, image generation, video analysis, music, Canvas apps and custom agents",
      "Analyse your videos with Gemini, build mini apps with Labs Gems, and automate repetitive processes with Gemini Canvas",
      "Create visual content with ChatGPT and explore its wider capabilities",
      "See how AI advertising with Google Flow can cut video production costs"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Course Roadmap",
        "lectures": [
          ["Welcome to the future of AI", 6],
          ["Become a confident AI creator", 6],
          ["Your AI mastery journey", 6],
          ["The complete AI Filmmaking Mastery roadmap: images, video, audio, avatars, influencer ads, lead generation and filmmaking", 6]
        ]
      },
      {
        "title": "Module 2: Understanding LLMs",
        "lectures": [
          ["What is an LLM: architecture, model sizes and training methods", 6],
          ["The 3-step workflow: gather resources, structure content, automate tasks", 6],
          ["Types of LLMs", 6],
          ["Choosing the right LLM: ChatGPT, Claude, DeepSeek or Perplexity", 6]
        ]
      },
      {
        "title": "Module 3: AI, LLM & Prompt — The Terms",
        "lectures": [
          ["AI vs LLM vs prompt, explained clearly", 6]
        ]
      },
      {
        "title": "Module 4: The Art of Prompting",
        "lectures": [
          ["Role-based prompting", 6],
          ["Few-shot prompting", 6],
          ["Reverse prompting: get the prompt behind any image", 6],
          ["Chain-of-thought prompting", 6],
          ["The prompt engineer's role", 6],
          ["What LLMs can and cannot do", 6]
        ]
      },
      {
        "title": "Module 5: Business Framework for LLMs",
        "lectures": [
          ["Creative vs business applications", 5],
          ["Choose your niche, classify information as dynamic or static, and build a knowledge base", 5],
          ["Practical example: a general insurance agent, with a DeepSeek research prompt", 5]
        ]
      },
      {
        "title": "Module 6: Building Gem Agents",
        "lectures": [
          ["Why build Gem agents: what to say, how to say it, the final output", 5],
          ["Build your first Gem: settings, purpose and instructions", 5],
          ["A sample Gem instruction template", 5]
        ]
      },
      {
        "title": "Module 7: Hands-on Demo — Insurance Advisor Gem",
        "lectures": [
          ["Step 1: choose your niche and gather resources with DeepSeek", 5],
          ["Step 2: build a Perplexity Space and decide what to sell", 5],
          ["Step 3: create your Gemini Gem", 5],
          ["Step 4: use the Gem to create content in any format, and turn it into a full marketing strategy", 5]
        ]
      },
      {
        "title": "Module 8: Google Gemini Ecosystem",
        "lectures": [
          ["Gemini as your AI assistant ecosystem: chat, images, video analysis, music, Canvas apps, custom agents", 5],
          ["The Gemini model family, and analysing your videos with Gemini", 5],
          ["Generate mini apps with Labs Gems", 5],
          ["Automate any repetitive process with Gemini Canvas and deploy it to Google Sites", 5]
        ]
      },
      {
        "title": "Module 9: ChatGPT Mastery",
        "lectures": [
          ["Live demo: visual content creation with ChatGPT", 5],
          ["What you can do with ChatGPT: documents, code, visuals, chatbots, research, ideas", 5]
        ]
      },
      {
        "title": "Module 10: AI Advertising & Wrap-Up",
        "lectures": [
          ["AI-powered advertising with Google Flow: why AI ads, how Flow works", 5],
          ["Annexure and course wrap-up", 5]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "A computer with a modern browser",
      "A Google account for Gemini, Gems and Canvas",
      "Free accounts for ChatGPT, DeepSeek and Perplexity",
      "Some features, such as Perplexity Spaces with files and Google Flow video generation, work best on paid plans. You can follow every lesson on free plans"
    ],
    "audience": [
      "Beginners starting the AI Filmmaking Mastery series",
      "Content creators who want better results from every AI tool",
      "Marketers and business owners who want an AI agent for their niche",
      "Insurance, finance and service professionals who want AI-generated marketing content",
      "Anyone who wants a solid foundation in LLMs and prompting before moving to AI images and video"
    ],
    "description": [
      "Want to create better AI films? Then don't start with video generation. Start with the AI brain behind it.",
      "Before AI can create the scene you imagine, you need to know how to communicate that vision clearly. Part 1 of AI Filmmaking Mastery gives you that foundation.",
      "Inside Part 1:",
      "• How LLMs work, and which one to use for which job",
      "• The art of prompting: role-based, few-shot, reverse and chain-of-thought",
      "• A business framework for structuring better AI instructions",
      "• How to build Gemini Gem agents",
      "• A hands-on, 4-step agent-building demo",
      "• The Google Gemini ecosystem",
      "• ChatGPT mastery",
      "• AI advertising with Google Flow",
      "Go from \"Make me a video…\" to structured AI thinking, better prompts, specialised agents and stronger creative direction.",
      "Better AI films start long before you press Generate.",
      "Understand → Prompt → Build → Create"
    ],
    "includes": [
      "10 modules, about 3 hours of learning",
      "28 lessons in plain language",
      "A 4-step hands-on Gem agent build",
      "Copy-ready prompts for DeepSeek, Perplexity and Gemini",
      "17 knowledge checks with 32 questions",
      "Clear tool guides for 6 AI platforms",
      "Certificate of completion",
      "Access for 7 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "film-2": {
    "subtitle": "What happens when the AI image tool you learned gets replaced? Do you start learning everything again? Not if you've mastered the framework. This course goes beyond individual tools. Learn how AI image generation works, which model to pick for each job, and proven prompt frameworks that work in any tool, now and in the future. Plus a reusable prompt library, AI ad creation with Google Pomelli, and a Gemini Gem that automates your prompting.",
    "learn": [
      "Understand the five pillars of AI image generation: image models, prompt engineering, image editing, style consistency and commercial use",
      "Compare today's leading AI image tools and know each one's strengths and weaknesses",
      "Pick the right model for every need with a quick-pick guide: photorealism, artistic style, text in images, speed, fashion, commercial safety, free and open-source",
      "Understand how AI image generation works: diffusion, latent space and the FLUX architecture, explained simply",
      "Know the key ethical and legal points for commercial AI images",
      "Write better prompts with the \"subject first\" rule and the 5C Prompt Contract",
      "Use zero-shot, few-shot and other reasoning techniques for image prompts",
      "Create social media ad visuals using the 5C framework",
      "Build cinematic, professional prompts with the 7-Component High-Impact Prompt Framework",
      "Use a ready-made prompt library: photorealistic, fashion, neon-noir, minimal, comedy, anime and commercial styles",
      "Build cinematic movie scenes with the Ultimate Movie Scene Prompt Builder, plus a quick daily version",
      "Analyse any business's brand \"DNA\" with Google Pomelli and generate on-brand ads, campaigns and photoshoots without writing prompts",
      "Create a Gemini Gem that automates any repetitive prompting task"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Introduction",
        "lectures": [
          ["Welcome to Takxila AI Academy", 9]
        ]
      },
      {
        "title": "Module 2: Introduction & Foundations",
        "lectures": [
          ["Welcome to AI Image Mastery", 9],
          ["The five pillars of AI image generation", 9]
        ]
      },
      {
        "title": "Module 3: Tools & Models Landscape",
        "lectures": [
          ["Popular AI image tools and key considerations", 9],
          ["Leading AI image generators: strengths and weaknesses", 9],
          ["The complete 2026 AI image model comparison", 9],
          ["Quick-pick guide: the best model for every need", 9]
        ]
      },
      {
        "title": "Module 4: Technical Deep Dive",
        "lectures": [
          ["How AI image generation works", 9],
          ["Latent space explained", 9],
          ["The FLUX architecture and FLUX.2 features", 9],
          ["Commercial applications", 9],
          ["Key ethical and legal notes", 9]
        ]
      },
      {
        "title": "Module 5: Prompt Engineering Frameworks",
        "lectures": [
          ["Lead with the subject: the fundamental command", 9],
          ["The 5C Prompt Contract: Character, Cause, Constraint, Contingency, Calibration", 9],
          ["Advanced techniques: zero-shot, few-shot and more", 9],
          ["Social media marketing ads using 5C", 9],
          ["The 7-Component High-Impact Prompt Framework: Canvas, Feature, Action, Signature Element, Aesthetic Mode, Tech Specs and more", 9],
          ["A full worked example", 9]
        ]
      },
      {
        "title": "Module 6: Reusable Prompt Library",
        "lectures": [
          ["Photorealistic and hyper-detailed prompts", 9],
          ["Fashion, neon-noir and minimal prompts", 9],
          ["Comedy, anime and commercial prompts", 9],
          ["The Ultimate Movie Scene Prompt Builder", 9],
          ["A full example, plus a quick mini version for daily use", 9]
        ]
      },
      {
        "title": "Module 7: Advanced Workflows & Tools",
        "lectures": [
          ["Google Pomelli: analyse any business's brand DNA", 9],
          ["Pomelli for UGC, creatives, campaigns and photoshoots", 8],
          ["Create a Gemini Gem to automate any repetitive process", 8]
        ]
      },
      {
        "title": "Module 8: Annexure & Course Completion",
        "lectures": [
          ["A companion prompt library on Claude", 8]
        ]
      }
    ],
    "requirements": [
      "No design or AI image experience needed",
      "Part 1 (LLM & Prompt Mastery) is recommended but not required",
      "A computer with a modern browser",
      "A Google account for Gemini, Gems and Pomelli",
      "At least one AI image tool to practise with. Gemini's Nano Banana and ChatGPT have free options; Midjourney is paid only"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "Content creators who want consistent, professional AI images",
      "Marketers and business owners creating ad visuals and social media creatives",
      "Designers who want to add AI image tools to their workflow",
      "Anyone tired of relearning every new AI image tool from scratch"
    ],
    "description": [
      "What happens when the AI image tool you learned gets replaced?",
      "Do you start learning everything again? Not if you've mastered the framework.",
      "AI image tools change every few months. New models launch, old favourites fall behind, and tutorials go out of date. This course goes beyond teaching individual tools. It teaches you how AI image generation works, how to choose the right model for each job, and prompt frameworks that work in any tool, today and in future.",
      "What you'll master:",
      "• How AI image generation actually works",
      "• The 2026 model landscape, and how to pick the right tool",
      "• The 5C Prompt Contract",
      "• The 7-Component High-Impact Prompt Framework",
      "• A reusable prompt library across 8+ styles",
      "• The Ultimate Movie Scene Prompt Builder",
      "• AI ad creation with Google Pomelli",
      "• A Gemini Gem that automates your prompting",
      "Learn the framework once. Use it in every tool.",
      "This is Part 2 of the AI Filmmaking Mastery series. The images you learn to create here become the starting frames for the AI videos and films you'll make in the next parts."
    ],
    "includes": [
      "8 modules, about 4 hours of learning",
      "22 lessons in plain language",
      "2 prompt frameworks you can use in any AI image tool (5C and 7-Component)",
      "A reusable prompt library across 8+ visual styles",
      "The Ultimate Movie Scene Prompt Builder",
      "A 2026 comparison of AI image models, plus a quick-pick guide",
      "14 knowledge checks with 28 questions",
      "A companion prompt library on Claude",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "film-3": {
    "subtitle": "Stop learning AI video tools. Master the frameworks behind great AI videos instead. Learn real filmmaking language (cameras, lenses, lighting, movement, framing, shot sizes and angles), then use it to direct AI video with structured prompts, the OCIV framework and the AI Filmmaker's Blueprint. Add voiceover, lip sync, music and editing, and finish with a complete 60-second AI film.",
    "learn": [
      "Understand camera types (smartphone, DSLR, cinema, action camera) and the look each one gives",
      "Choose lenses and focal lengths for different shots",
      "Set the mood with exposure and lighting",
      "Use camera movements, such as tilt, pan and dolly, to tell a story",
      "Frame shots well: rule of thirds, symmetry, frame within a frame, negative space, leading lines",
      "Use all seven shot sizes, from extreme close-up to extreme long shot, and every key camera angle",
      "Know the four ways to generate AI video: text-to-video, image-to-video, video-to-video and motion-to-video",
      "Write complete video prompts with 7 parts: subject, action, environment, camera, lighting, style and mood",
      "Keep characters consistent across multiple shots with a character block",
      "Fix common AI video problems: morphing faces, extra fingers and jittery motion",
      "Plan and produce a commercial ad with the OCIV framework: Objective, Concept, Image, Video",
      "Follow the AI Filmmaker's Blueprint: idea → story concept → scene-wise JSON prompts → images → videos → voiceover and music → edit",
      "Create voiceovers with ElevenLabs or Murf, lip sync with Hedra or HeyGen, and music with Suno, Lyria or AIVA",
      "Add sound effects and choose the right music style for each mood",
      "Edit your first cut: trim, align music and voiceover, add transitions and export",
      "Run a complete production pipeline, from pre-production to publishing",
      "Build a 60-second AI short film as your capstone project"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Introduction",
        "lectures": [
          ["Welcome to AI Video Mastery", 9]
        ]
      },
      {
        "title": "Module 2: Filmmaking Foundations",
        "lectures": [
          ["Camera types: smartphone, DSLR/mirrorless, cinema camera, action camera", 9],
          ["Lens types and focal lengths", 9],
          ["Exposure and lighting moods", 9],
          ["Camera movements", 9],
          ["Framing and composition: rule of thirds, symmetry, frame within frame, negative space, leading lines", 9]
        ]
      },
      {
        "title": "Module 3: Shot Language",
        "lectures": [
          ["Shot sizes: ECU, CU, MCU, MS, MLS, LS, ELS", 9],
          ["Camera angles", 9]
        ]
      },
      {
        "title": "Module 4: AI Video Generation Types",
        "lectures": [
          ["Four ways to generate AI video: text, image, video and motion to video", 9],
          ["Video-to-video style transfer", 9]
        ]
      },
      {
        "title": "Module 5: Prompt Mastery",
        "lectures": [
          ["Anatomy of a full prompt: subject, action, environment, camera, lighting, style, mood", 9],
          ["Style prompts library", 9],
          ["Multi-shot consistency with a character block", 9],
          ["Common failures and fixes: morphing faces, extra fingers, jittery motion", 9]
        ]
      },
      {
        "title": "Module 6: AI Video Formula — OCIV",
        "lectures": [
          ["The OCIV framework: Objective, Concept, Image, Video", 9],
          ["Commercial ad case study: objective and idea with ChatGPT", 9],
          ["Images and video: scene-wise JSON prompts in Google Flow / Nano Banana, then image to video", 9],
          ["Music, voiceover and the final edit in Clipchamp", 9]
        ]
      },
      {
        "title": "Module 7: AI Filmmaker's Blueprint",
        "lectures": [
          ["Blueprint overview", 9],
          ["Decide your objective or idea", 9],
          ["Create your story concept", 8],
          ["Scene-wise story visuals with JSON prompts", 8],
          ["Create AI images in Gemini", 8],
          ["Turn frames into videos with Google Vids", 8],
          ["Voiceover and music: Lyria, Suno or MiniMax", 8],
          ["Editing: cut, align music and voice, add transitions, export", 8]
        ]
      },
      {
        "title": "Module 8: Voiceover, Audio & Lip Sync",
        "lectures": [
          ["Voiceover with ElevenLabs or Murf", 8],
          ["Lip sync with Hedra or HeyGen", 8],
          ["Music for every mood (lo-fi, epic score, horror ambient) with Suno or AIVA", 8],
          ["Sound effects with ElevenLabs", 8]
        ]
      },
      {
        "title": "Module 9: Full Production Workflow & Capstone",
        "lectures": [
          ["The complete pipeline: pre-production, production, post-production, publishing", 8],
          ["Capstone project: \"The Last Bakery,\" a 60-second AI film", 8],
          ["Free tools at a glance: Kling, Hailuo, Hedra, CapCut, ElevenLabs and more", 8],
          ["Best practices: do this, not that", 8],
          ["Annexure: prompt guide", 8]
        ]
      }
    ],
    "requirements": [
      "No filmmaking or video experience needed",
      "Parts 1 and 2 of AI Filmmaking Mastery are recommended but not required",
      "A computer with a modern browser",
      "A Google account for Gemini, Flow and Vids",
      "Free accounts for ChatGPT, Kling, Hailuo, Suno, ElevenLabs and CapCut. The course focuses on free tools and free credits. Paid plans give more credits and watermark-free output"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "Content creators who want AI videos that look directed, not random",
      "Marketers and business owners who want AI video ads without a film crew",
      "Aspiring filmmakers who want to learn camera language and AI production together",
      "Anyone who keeps relearning new AI video tools and wants skills that last"
    ],
    "description": [
      "Stop learning AI video tools.",
      "The AI video generator you master today could be replaced by a better one tomorrow. So what should you master instead? The frameworks behind great AI videos.",
      "This isn't another course teaching you which buttons to click. You'll learn to think and create like an AI filmmaker.",
      "What you'll master:",
      "• Camera types and lenses",
      "• Lighting and exposure moods",
      "• Camera movements",
      "• Framing and composition",
      "• Shot sizes and camera angles",
      "• AI video generation methods",
      "• AI video prompt mastery",
      "• The OCIV framework",
      "• The AI Filmmaker's Blueprint",
      "• Voiceover and lip sync",
      "• Music and sound design",
      "• Editing and visual alignment",
      "• A complete production workflow and capstone",
      "Learn the filmmaking framework once. Apply it to any AI video tool.",
      "Tools change. Models change. Interfaces change.",
      "Storytelling stays. Camera language stays. Creative direction stays. Frameworks stay.",
      "Don't become an expert at operating one AI video tool. Become an AI filmmaker.",
      "Master the framework. Use any tool. Direct your vision."
    ],
    "includes": [
      "9 modules, about 5 hours of learning",
      "33 lessons",
      "The OCIV framework and the AI Filmmaker's Blueprint",
      "A full commercial ad case study, step by step",
      "A style prompts library and a 7-part prompt template",
      "Scene-wise JSON prompt examples",
      "A troubleshooting guide for common AI video problems",
      "A capstone project: \"The Last Bakery,\" a 60-second AI short film",
      "A guide to free AI video, voice and lip-sync tools",
      "22 knowledge checks with 42 questions",
      "A companion prompt guide on Claude",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "film-4": {
    "subtitle": "Stop just converting text into speech. Learn to design and direct AI audio: clone your own voice, master text-to-speech settings, change voices, create sound effects and music, produce audiobooks and podcasts, dub videos into other languages, add emotion with audio tags, and design custom character voices with a 6-component framework. Everything is taught hands-on in ElevenLabs, the leading AI voice platform.",
    "learn": [
      "Clone your own voice, both Instant and Professional, with a script written by Claude",
      "Get natural speech by choosing the right model and fine-tuning stability, similarity and style",
      "Use ready-made text-to-speech prompts for different uses",
      "Turn any recording into your cloned voice with Voice Changer",
      "Create custom sound effects from text prompts written with ChatGPT",
      "Compose a brand signature theme, plus Bollywood and regional music, with ElevenLabs Music",
      "Produce audiobooks and podcasts in ElevenLabs Studio with multiple narrators",
      "Dub videos into other languages with speaker detection and optional lip sync",
      "Add emotion with audio tags in the V3 model, using five tag categories",
      "Design custom character voices with the 6-component voice design framework",
      "Write a full multi-character script with ChatGPT and give each character its own voice",
      "Fine-tune and blend voices in Voice Lab",
      "Manage long-form voiceovers in Projects, editing sentence by sentence",
      "Use the Voice Library, real-time voice and speech-to-speech conversion",
      "Fix mispronounced names and words with the Pronunciation Dictionary",
      "Understand pricing, credits and usage, and estimate project costs"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Introduction",
        "lectures": [
          ["Mastering ElevenLabs audio", 7]
        ]
      },
      {
        "title": "Module 2: Voice Cloning",
        "lectures": [
          ["Professional voice clone: train your own voice", 7],
          ["Instant voice clone: the quicker alternative", 7],
          ["Write your recording script with Claude, record, and upload", 7]
        ]
      },
      {
        "title": "Module 3: Text-to-Speech Mastery",
        "lectures": [
          ["Choosing the right model", 7],
          ["Fine-tuning stability, similarity and style", 7],
          ["Prompt examples by use case", 7]
        ]
      },
      {
        "title": "Module 4: Voice Changer & Sound Effects",
        "lectures": [
          ["Change any recording into your cloned voice", 7],
          ["Create sound effects from text prompts", 7]
        ]
      },
      {
        "title": "Module 5: ElevenLabs Music",
        "lectures": [
          ["A brand signature theme", 7],
          ["Bollywood and regional music tracks", 7]
        ]
      },
      {
        "title": "Module 6: Studio — Audiobooks & Podcasts",
        "lectures": [
          ["Set up a Studio project", 7],
          ["Assign voices and narrators", 7],
          ["Write, format and generate a full audiobook", 7]
        ]
      },
      {
        "title": "Module 7: Dubbing",
        "lectures": [
          ["Create a dub and choose languages", 7],
          ["Speaker detection and voice assignment", 7],
          ["Optional lip sync", 7],
          ["Preview and download", 7]
        ]
      },
      {
        "title": "Module 8: Audio Tags & Emotion Injection",
        "lectures": [
          ["Five categories of audio tags in the V3 model", 7],
          ["Use a tag generator on your story", 7],
          ["Add speakers and generate", 7]
        ]
      },
      {
        "title": "Module 9: Voice Design — 6-Component Framework",
        "lectures": [
          ["Create custom character voices step by step", 7],
          ["The six essential voice design components, with character examples", 7],
          ["Write a full multi-character script with ChatGPT and design each voice", 7]
        ]
      },
      {
        "title": "Module 10: Advanced Studio Toolkit",
        "lectures": [
          ["Voice Lab: fine-tuning and blending voices", 7],
          ["Projects: long-form voiceover management", 7],
          ["Voice Library, real-time voice and speech-to-speech", 7],
          ["Pronunciation Dictionary", 7]
        ]
      },
      {
        "title": "Module 11: Pricing, Takeaways & Annexure",
        "lectures": [
          ["Pricing and the usage dashboard, with a cost calculation example", 7],
          ["Key takeaways and annexure", 7]
        ]
      }
    ],
    "requirements": [
      "No audio or AI experience needed",
      "Parts 1–3 of AI Filmmaking Mastery are recommended but not required",
      "A computer with a microphone (a quiet room helps for voice cloning)",
      "An ElevenLabs account. The free plan covers basic text-to-speech and sound effects",
      "Voice cloning, commercial use and some Studio and dubbing features need a paid ElevenLabs plan or free trial. The course shows you how to estimate costs before upgrading",
      "Free ChatGPT and Claude accounts for writing scripts"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "Content creators and YouTubers who want professional voiceovers",
      "Marketers who want brand music, ad voiceovers and multilingual content",
      "Authors and podcasters who want to produce audiobooks and podcasts",
      "Educators and trainers who want course narration in multiple languages"
    ],
    "description": [
      "Don't just click \"Generate.\" Become the director of the voice.",
      "Most people use AI audio to turn text into speech and stop there. This course teaches you to design and direct AI audio: choosing the right voice, shaping emotion, building characters, adding sound and music, and producing finished audio for films, ads, audiobooks and podcasts.",
      "What you'll learn:",
      "• Voice cloning",
      "• Text-to-speech mastery",
      "• Voice changing",
      "• AI sound effects",
      "• AI music, brand themes and Bollywood tracks",
      "• Audiobooks and podcasts",
      "• Multi-language dubbing",
      "• Emotion injection with audio tags",
      "• The 6-component voice design framework",
      "• Voice fine-tuning and blending",
      "• Long-form voiceover production",
      "• Speech-to-speech and real-time audio",
      "Every skill is taught step by step in ElevenLabs, the leading AI voice platform. The principles behind them (voice design, emotion, pacing and storytelling) work in any AI audio tool you use in future.",
      "Tools change. Voice principles, emotion and storytelling stay.",
      "This is Part 4 of the AI Filmmaking Mastery series. The voices, music and sound you create here bring your AI films to life."
    ],
    "includes": [
      "11 modules, about 3.5 hours of learning",
      "17 step-by-step lessons",
      "The 6-component voice design framework",
      "Ready-to-use prompts for scripts, sound effects, music and character voices",
      "A worked multi-character audio story",
      "A cost calculation example",
      "11 knowledge checks with 23 questions",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "film-5": {
    "subtitle": "What if you never had to record the same video twice? Create your digital twin from a 5-minute recording, or design a virtual character from scratch. Give it many looks, a voice and natural motion. Then turn it into UGC ads, product videos, translated videos, podcasts and narrated presentations, all hands-on in HeyGen.",
    "learn": [
      "Choose your path: clone yourself (digital twin) or create a virtual character",
      "Record a 5-minute source video with the right lighting, background and delivery for a realistic clone",
      "Create a virtual character from your photos, or design one with AI, then lock its look and voice",
      "Create many looks for one avatar with HeyGen Looks (Flux) and the 7-part image prompt: subject, pose, wardrobe, setting, lighting, camera, mood",
      "Generate a full set of looks at once with Look Pack",
      "Create extra images in Higgsfield or Gemini when a client gives you only a few photos",
      "Build a UGC-style product ad in five clicks with Product Placement",
      "Translate any video into other languages with lip sync and a brand glossary",
      "Turn a PDF into a two-avatar video podcast",
      "Follow the pro pipeline: write with ChatGPT → voice with ElevenLabs → render in HeyGen",
      "Choose the right engine: Avatar IV vs Unlimited",
      "Direct avatar motion scene by scene with the Motion Engine",
      "Turn PPTs and PDFs into narrated videos",
      "Use pro tips to build repeatable, scalable avatar content"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Orientation",
        "lectures": [
          ["AI avatars with HeyGen", 10],
          ["Who this is for: use your own face, build a virtual influencer, scale across languages", 10],
          ["What you'll cover", 10]
        ]
      },
      {
        "title": "Module 2: Create Your Avatar",
        "lectures": [
          ["Two paths: clone a real person or create a virtual character", 10],
          ["Path A, clone a real person: input, lighting, background, delivery, upload", 10],
          ["Path B, create a virtual character: upload photos or design with AI, set the voice, lock the character", 10]
        ]
      },
      {
        "title": "Module 3: Design Looks at Scale",
        "lectures": [
          ["Flux-powered Looks and the 7-part image prompt", 10],
          ["One avatar, many looks at once with AI Studio and Look Pack", 10],
          ["Generate more images in Higgsfield or Gemini when photos are limited", 10]
        ]
      },
      {
        "title": "Module 4: HeyGen Apps That Ship",
        "lectures": [
          ["Overview: product placement, video translation, video podcasts", 9],
          ["Product Placement: build a UGC ad in five clicks", 9],
          ["Translate any video: engine choice, lip sync, dynamic duration, brand glossary", 9],
          ["PDF in, podcast out, with two avatars", 9]
        ]
      },
      {
        "title": "Module 5: Voice, Motion & Output",
        "lectures": [
          ["The pipeline: ChatGPT → ElevenLabs → HeyGen", 9],
          ["Engine selection: Avatar IV vs Unlimited", 9],
          ["Motion Engine: direct the avatar scene by scene", 9],
          ["PPT / PDF → narrated video", 9]
        ]
      },
      {
        "title": "Module 6: Production Tips & Wrap-Up",
        "lectures": [
          ["Best practices: source recording, Look Pack first, bring your own audio, the right engine, motion only on the hook and close, brand glossary", 9],
          ["Your action plan: record, create looks, produce a video, translate and scale", 9]
        ]
      }
    ],
    "requirements": [
      "No video or AI experience needed",
      "Parts 1–4 of AI Filmmaking Mastery are recommended but not required",
      "A smartphone or webcam to record your 5-minute source video (for the digital-twin path)",
      "A HeyGen account. Avatar creation, video translation and most advanced features need a paid HeyGen plan or credits",
      "Free ChatGPT and ElevenLabs accounts (ElevenLabs voice cloning needs a paid plan)"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "Coaches, trainers and educators who want to create videos without recording each one",
      "Business owners and marketers who want UGC-style product ads",
      "Creators who want to build a virtual influencer",
      "Agencies and freelancers producing multilingual video content for clients"
    ],
    "description": [
      "What if you never had to record the same video twice?",
      "Create your digital twin. Give it your look. Give it a voice. Make it speak. Make it move. And turn it into content.",
      "Choose your path:",
      "• YOU → YOUR DIGITAL TWIN",
      "• or",
      "• IDEA → YOUR VIRTUAL CHARACTER",
      "Then bring it to life:",
      "• Clone a real person from a 5-minute recording",
      "• Create a virtual character",
      "• Create multiple looks for one avatar",
      "• Design looks with Flux and the 7-part image prompt",
      "• Create UGC-style content",
      "• Put your avatar into product videos",
      "• Translate videos with lip sync",
      "• Add AI voice with ElevenLabs",
      "• Direct avatar motion scene by scene",
      "• Turn PPTs and PDFs into narrated videos and podcasts",
      "• Build repeatable avatar-based content",
      "One avatar. Many looks. Endless content.",
      "This is Part 5 of the AI Filmmaking Mastery series. Your avatar becomes the presenter, spokesperson or influencer for the content you create."
    ],
    "includes": [
      "6 modules, about 3 hours of learning",
      "19 step-by-step lessons",
      "Two avatar paths: digital twin and virtual character",
      "The 7-part image prompt for avatar looks",
      "4 ready-to-use HeyGen workflows: product placement, translation, PDF-to-podcast, PPT-to-video",
      "The ChatGPT → ElevenLabs → HeyGen production pipeline",
      "11 knowledge checks with 22 questions",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "film-6": {
    "subtitle": "Stop learning AI UGC tools one by one. The real skill is knowing how to build the ad. Create AI influencers with consistent character boards, put them into product ads, swap characters, add lip sync and talking-head video, generate B-rolls and sound, and build complete UGC ads with the 5-step SS-VV-AS framework.",
    "learn": [
      "Understand the two skills transforming marketing: AI influencer creation and product ad generation",
      "Create a UGC product ad for free with Google AI Studio's Influencer UGC Ad Creator app",
      "Build product video ads in Picsart workflows, using image-to-video and video-to-video",
      "Build a character board so your AI influencer looks the same in every scene",
      "Generate multiple angles, close-ups, full-body fashion shots and outfit changes",
      "Swap characters, create lip-synced videos, and upscale and polish your footage",
      "Master the SS-VV-AS framework: Script & Shots → Visual Frame → Video → B-Roll → Audio & Edit",
      "Plan your ad by answering 6 key questions, then build a shot list",
      "Create the visual frame with a \"magic prompt\" in Gemini",
      "Turn the frame into a talking-head video with Google Flow (Veo 3.1)",
      "Generate supporting B-rolls that make ads feel real",
      "Add background music, sound effects and a consistent voice with ElevenLabs",
      "Use ready-made GPT tools for character variations and scripts",
      "Explore free tools for unlimited image and video generation (WAN and Qwen)"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Two Skills Overview",
        "lectures": [
          ["AI influencers, UGC and product ads", 13],
          ["The two skills transforming marketing: AI influencer creation and product ad generation", 13]
        ]
      },
      {
        "title": "Module 2: Product Ads with AI Influencers",
        "lectures": [
          ["Google AI Studio: a free UGC ad creator (upload images, give the prompt, generate)", 13],
          ["Product UGC ads in Picsart: image-to-video and video-to-video workflows", 13]
        ]
      },
      {
        "title": "Module 3: Building Your Character Board",
        "lectures": [
          ["Why character boards matter: brand consistency, scene flexibility, scalable production", 13],
          ["Create a character board step by step with ChatGPT or Claude and Google Flow", 13],
          ["Advanced prompts: side profile, extreme close-up, full-body fashion, outfit transfer", 13]
        ]
      },
      {
        "title": "Module 4: Character Swap, Lip Sync & Video Tools",
        "lectures": [
          ["Character swapping", 13],
          ["Lip-sync videos", 13],
          ["Upscaling and polishing", 13]
        ]
      },
      {
        "title": "Module 5: The SS-VV-AS Framework",
        "lectures": [
          ["The 5-step viral UGC ads framework", 13],
          ["Step 1, Script & Shot List: 6 questions and a shot list table", 13],
          ["Step 2, Visual Frame: magic prompt template in Gemini", 12],
          ["Step 3, Image to Video: talking head in Google Flow (Veo 3.1)", 12],
          ["Step 4, B-Rolls: what they are, how to generate them, why they matter", 12],
          ["Step 5, Edit & Audio: music, sound effects and voice consistency", 12]
        ]
      },
      {
        "title": "Module 6: Best Practices, Toolkit & Annexure",
        "lectures": [
          ["Complete workflow, best practices and common mistakes", 12],
          ["Two more character GPTs, plus ElevenLabs Voice Changer tips", 12],
          ["Annexure: free AI toolkit (WAN video, Qwen image and video)", 12]
        ]
      }
    ],
    "requirements": [
      "No video or ad-making experience needed",
      "Earlier parts of AI Filmmaking Mastery are recommended but not required",
      "A computer with a modern browser",
      "A Google account for AI Studio, Gemini and Flow",
      "Free accounts: ChatGPT, Picsart, Kling and ElevenLabs",
      "Your own product images (for product ads)",
      "Veo video generation in Google Flow uses credits; free allowances are limited and paid Google AI plans give more"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "D2C brands and ecommerce sellers who want UGC ads without hiring creators",
      "Marketers and agencies producing social media ads at scale",
      "Creators who want to build an AI influencer",
      "Freelancers who want to offer AI UGC ad creation as a service"
    ],
    "description": [
      "Stop learning AI UGC tools one by one.",
      "A new AI influencer tool launches. Then another. Then another. But the real skill isn't knowing which button to click. The real skill is knowing how to build the ad.",
      "Learn how to:",
      "• Create AI influencers",
      "• Build consistent character boards",
      "• Put characters into product ads",
      "• Swap characters",
      "• Create lip-synced videos",
      "• Create talking-head content",
      "• Generate supporting B-rolls",
      "• Add audio and sound effects",
      "• Build complete UGC ads",
      "And most importantly, master the SS-VV-AS framework, a 5-step UGC creation process:",
      "Script & Shots → Visual Frame → Video → B-Roll → Audio & Edit",
      "So instead of asking \"Which AI tool should I learn?\", you'll start asking \"What do I want to create, and which tool can execute my framework?\"",
      "Master the framework. Use any tool.",
      "This is Part 6 of the AI Filmmaking Mastery series."
    ],
    "includes": [
      "6 modules, about 4 hours of learning",
      "17 step-by-step lessons",
      "The 5-step SS-VV-AS framework for UGC ads",
      "A character board method for consistent AI influencers",
      "A 6-question script planner and shot list template",
      "Magic prompt templates for visuals and video",
      "A GPT toolkit and a free AI tools annexure",
      "11 knowledge checks with 21 questions",
      "Certificate of completion",
      "Access for 15 days"
    ],
    "level": "Beginner to Intermediate",
    "language": "English"
  },
  "film-7": {
    "subtitle": "What if your documents could talk back to you? In seconds, turn your web research, PDFs, notes and course material into audio overviews, videos, slide decks, infographics, reports, flashcards and quizzes. Learn to build trained notebooks in Google NotebookLM, connect them to Gemini, and write YouTube scripts and other content grounded in your own sources.",
    "learn": [
      "Understand what NotebookLM is: AI that answers only from the sources you give it",
      "Know the core features: Audio Overviews, Video Overviews, Mind Maps, Deep Research, the Studio panel and interactive audio chat",
      "Follow a 5-step workflow to turn sources into publish-ready content",
      "Choose between the Free and Plus plans",
      "See real uses: course development, YouTube content pipelines, AI tool research hubs, devotional and music content",
      "Know when to use NotebookLM vs Perplexity, DeepSeek or Gemini",
      "Build your first trained notebook in 8 steps: research with Perplexity, add and validate sources, filter and save",
      "Connect NotebookLM to Gemini for richer, more natural results",
      "Write a professional YouTube script, including a Hinglish example",
      "Create Audio Overviews in four formats: Deep Dive, Brief, Critique and Debate",
      "Create Video Overviews in Explainer and Brief formats",
      "Build accurate infographics with source checks and citations",
      "Generate slide decks (detailed or presenter-style), reports and flashcards",
      "Create quizzes with easy, medium and hard questions",
      "Use master prompts for research, source validation, notebook setup and smart filtering",
      "Apply ready-made master prompts for business analysis, content repurposing, exam study and personal admin"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & What Is NotebookLM",
        "lectures": [
          ["NotebookLM: your AI research and content engine", 6],
          ["What we'll cover", 6],
          ["What NotebookLM is: source-grounded AI, many sources per notebook, works on any device", 6]
        ]
      },
      {
        "title": "Module 2: Core Features & Getting Started",
        "lectures": [
          ["Core features at a glance", 6],
          ["The 5-step workflow to publish-ready assets", 6],
          ["Free vs Plus plans", 6]
        ]
      },
      {
        "title": "Module 3: Real-World Use Cases & Platform Comparison",
        "lectures": [
          ["Course development and a YouTube content pipeline", 6],
          ["An AI tool research hub, and devotional and music content", 6],
          ["NotebookLM vs Perplexity/DeepSeek vs Gemini", 6]
        ]
      },
      {
        "title": "Module 4: Building Your First Trained Notebook",
        "lectures": [
          ["A real example, start to finish", 6],
          ["Steps 1–4: open, research with Perplexity, prompt, add sources", 6],
          ["Steps 5–8: import, validate, filter, save", 6]
        ]
      },
      {
        "title": "Module 5: Integrating NotebookLM with Gemini",
        "lectures": [
          ["Connect NotebookLM to Gemini", 6],
          ["The professional YouTube scriptwriter role", 6],
          ["A real Hinglish YouTube script opening", 6]
        ]
      },
      {
        "title": "Module 6: Audio & Video Overview Mastery",
        "lectures": [
          ["Audio Overviews: Deep Dive, Brief, Critique, Debate", 6],
          ["Video Overviews: Explainer and Brief formats", 6]
        ]
      },
      {
        "title": "Module 7: Visual Outputs, Reports & Flashcards",
        "lectures": [
          ["Infographics with source checks and citations", 6],
          ["Slide decks: detailed deck vs presenter slides", 6],
          ["Reports and flashcards", 6]
        ]
      },
      {
        "title": "Module 8: Quizzes, Master Prompts & Wrap-Up",
        "lectures": [
          ["Quizzes with progressive difficulty", 5],
          ["Master prompts: research and source validation", 5],
          ["Master prompts: notebook configuration and smart filtering", 5],
          ["Master prompts: business analyst and content creator", 5],
          ["Master prompts: study and exams, and personal admin, plus a bonus \"Pro Mode\" prompt", 5],
          ["Final thoughts: your first script is waiting", 5]
        ]
      }
    ],
    "requirements": [
      "No AI experience needed",
      "A computer or phone with a modern browser",
      "A free Google account for NotebookLM and Gemini",
      "A free Perplexity account for source research",
      "Your own PDFs, notes or links to practise with",
      "The free NotebookLM plan covers the course. Plus gives higher limits"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "YouTubers and content creators who want researched scripts fast",
      "Course creators and trainers turning material into videos, slides and quizzes",
      "Students preparing for exams with flashcards and quizzes",
      "Researchers and professionals who work with lots of documents"
    ],
    "description": [
      "What if your documents could talk back to you?",
      "Your web research. Your PDFs. Your notes. Your reference material. Your course content. Bring them together in NotebookLM and turn them into an AI-powered knowledge workspace, then into ready-to-use content in seconds.",
      "Learn how to:",
      "• Build trained notebooks",
      "• Research across your sources",
      "• Create YouTube scripts",
      "• Connect NotebookLM and Gemini",
      "• Generate Audio Overviews",
      "• Create Video Overviews",
      "• Build infographics",
      "• Generate slide decks",
      "• Create reports",
      "• Build flashcards",
      "• Generate quizzes",
      "• Work with master prompts",
      "Go from scattered information → organised AI knowledge → ready-to-use outputs.",
      "Upload → Understand → Create",
      "Because NotebookLM answers from your own sources, the content you create stays accurate and grounded, which makes it ideal for course creators, researchers, students and YouTubers.",
      "This is Part 7 of the AI Filmmaking Mastery series. Your scripts and research become the foundation of your next AI video or film."
    ],
    "includes": [
      "8 modules, about 2.5 hours of learning",
      "26 short lessons",
      "An 8-step method to build a trained notebook",
      "Pro prompts for every Studio output: audio, video, infographic, slides, reports, flashcards, quiz",
      "A library of master prompts for research, business, content creators, students and personal use",
      "A real Hinglish YouTube script example",
      "10 knowledge checks with 12 questions",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "film-8": {
    "subtitle": "Still searching for leads manually? Use free AI tools to find B2B and B2C leads, organise them in dashboards, and write personalised cold emails, call scripts and outreach messages. Pull business data from Google Maps with Nocoderai, build a complete lead system in Claude, and create a B2C lead dashboard in Perplexity Labs. No coding needed.",
    "learn": [
      "Understand what a lead is, and the difference between B2B and B2C lead generation",
      "Extract business data from Google Maps with Nocoderai and SerpAPI, then export a clean lead list",
      "Choose the right business categories to search, and launch your campaign",
      "Prepare your business context (niche, location, problem, offer, case study) so AI outreach is relevant",
      "Build a complete B2B lead system in Claude: lead lists, email variants, personalised cold emails and cold call scripts",
      "Generate fresh lead lists without duplicates",
      "Use quick B2B tricks and ChatGPT prompts to find leads faster",
      "Turn leads into clients with the S.O.S.T.C. framework: Spot, Observe, Suggest, Transform, Close",
      "Use the I.S.P.G. framework (Idea, Skeleton, Prompt, Generation) to build a website pitch for prospects",
      "Build a B2C lead dashboard in Perplexity Labs with stats, filters, a leads table and outreach templates",
      "Answer 7 key questions so Perplexity finds the right customers on the right platforms",
      "Follow a complete real example for a training institute",
      "Apply best practices: quality over quantity, personalisation, tracking, testing, follow-up and compliance",
      "Follow a 4-week action plan and a monthly review checklist"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Course Overview",
        "lectures": [
          ["Lead generation in the modern era: what a lead is", 5],
          ["Two types of leads: B2B vs B2C", 5],
          ["Free tools for lead generation", 5]
        ]
      },
      {
        "title": "Module 2: B2B Lead Generation with Nocoderai",
        "lectures": [
          ["Extract business data from Google Maps, instead of stale and costly lists", 5],
          ["Setup: sign up for SerpAPI, get your API key, configure the Nocoderai Maps tool, run and export", 5],
          ["Business categories to search", 5],
          ["Launching your campaign", 5]
        ]
      },
      {
        "title": "Module 3: B2B Lead Generation with Claude",
        "lectures": [
          ["Build a complete lead generation system", 5],
          ["Prepare your business context", 5],
          ["Prompt 1: lead generation", 5],
          ["Prompt 2: email variant generator", 5],
          ["Prompt 3: cold email copywriter", 5],
          ["Prompt 4: cold call script creator", 5],
          ["Repeat without duplicates", 5],
          ["The complete Claude workflow, step by step", 5],
          ["Tips and troubleshooting", 5]
        ]
      },
      {
        "title": "Module 4: Quick B2B Tricks & Bonus Tools",
        "lectures": [
          ["Easy tricks and two ChatGPT prompts for B2B leads", 5],
          ["S.O.S.T.C.: convert leads into clients", 5],
          ["I.S.P.G.: the AI website framework", 5],
          ["An example of a B2B lead converting into business", 5]
        ]
      },
      {
        "title": "Module 5: B2C Lead Generation with Perplexity",
        "lectures": [
          ["Build a lead dashboard in Perplexity Labs", 5],
          ["Phase 1: 7 key questions", 5],
          ["The complete, copy-ready Perplexity prompt", 5],
          ["Phase 2: search rules and data extraction", 5]
        ]
      },
      {
        "title": "Module 6: B2C Dashboard, Outreach & Real Example",
        "lectures": [
          ["Dashboard stats and filters", 5],
          ["The leads table", 5],
          ["Outreach templates", 5],
          ["Action buttons and platform breakdown", 5],
          ["Rules for using the system", 5],
          ["A complete example for a training institute", 5]
        ]
      },
      {
        "title": "Module 7: Best Practices & Your Action Plan",
        "lectures": [
          ["Quality over quantity, and personalisation", 5],
          ["Track, test and iterate", 5],
          ["Follow-up, compliance and combining methods", 5],
          ["Your 4-week action plan", 5],
          ["Monthly review checklist and resources", 5],
          ["Final thoughts", 5]
        ]
      }
    ],
    "requirements": [
      "No coding or sales experience needed",
      "A computer with a modern browser",
      "Free accounts: Claude, Perplexity, ChatGPT, Nocoderai and SerpAPI (free monthly search allowance)",
      "Your business details: niche, location, offer and a case study or result",
      "Some features, such as Perplexity Labs, work best on paid plans. Free allowances are limited"
    ],
    "audience": [
      "Freelancers and agencies who need a steady flow of clients",
      "Small business owners who want more B2B or B2C customers",
      "Sales and business development professionals",
      "Training institutes, coaches and service providers looking for students or clients",
      "Anyone who wants to stop building lead lists by hand"
    ],
    "description": [
      "Still searching for leads manually?",
      "Google searches. Business directories. Copying details. Building spreadsheets. Writing emails one by one. Preparing outreach. AI can help you do it smarter.",
      "Learn practical ways to use AI for:",
      "• B2B lead generation",
      "• B2C lead generation",
      "• Business and prospect research",
      "• AI-powered lead discovery from Google Maps",
      "• Lead dashboards",
      "• Lead filtering",
      "• Cold email creation",
      "• Cold call scripts",
      "• Personalised outreach",
      "• Duplicate-free lead research",
      "• Tracking and optimisation",
      "Work hands-on with Nocoderai, Claude and Perplexity.",
      "Go from searching for leads → organised prospect data → ready-to-use outreach.",
      "Find → Research → Organise → Personalise → Reach out",
      "You'll also learn two frameworks for turning leads into paying clients, plus a 4-week action plan so lead generation becomes a weekly habit, not a one-time effort.",
      "Put AI to work on your lead pipeline."
    ],
    "includes": [
      "7 modules, about 3 hours of learning",
      "37 short lessons",
      "Copy-ready Claude prompts for lead lists, email variants, cold emails and call scripts",
      "A copy-ready Perplexity prompt for a B2C lead dashboard",
      "The S.O.S.T.C. client-conversion framework and the I.S.P.G. website framework",
      "A complete worked B2C example",
      "A 4-week action plan and a monthly review checklist",
      "14 knowledge checks with 17 questions",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
  "film-9": {
    "subtitle": "Stop just generating AI songs. Learn to design them. This is a hands-on 5-day plan in Suno AI: create your first song, master the GMIV prompt formula, write lyrics and control songs with meta tags, extend songs and work with stems in Suno Studio, then bring your own voice with audio uploads and voice cloning.",
    "learn": [
      "Understand what Suno AI can do, and which plan you need",
      "Create your first song in Simple Mode in under a minute",
      "Write strong song prompts with the GMIV formula, and see weak vs strong prompts side by side",
      "Use 20 genre prompt templates: Indian and devotional, Bollywood and Hindi, jazz and soul, cinematic, special occasions, English pop and rock, electronic and EDM",
      "Avoid common prompt mistakes",
      "Switch to Custom Mode and write your own lyrics, with ChatGPT, NotebookLM or ready-made templates",
      "Control song structure, vocals and mood with meta tags",
      "Extend songs section by section in Suno Studio",
      "Split songs into stems (vocals, drums, instruments), mute layers and download them",
      "Export and publish your songs",
      "Use all 6 audio upload modes: cover, sample, add vocals, inspo, mashup and more",
      "Sing or hum your own melody and turn it into a full song",
      "Clone your own voice with Suno Persona and use it in new songs",
      "Keep a song log and research notes in NotebookLM"
    ],
    "sections": [
      {
        "title": "Module 1: Welcome & Course Overview",
        "lectures": [
          ["Create a song with Suno AI", 11],
          ["Course goals and the 5-day agenda", 11]
        ]
      },
      {
        "title": "Module 2: Day 1 — Tools & Your First Song",
        "lectures": [
          ["What Suno AI is and what it can do", 11],
          ["Set up Suno and NotebookLM, plus a Suno plan guide", 11],
          ["Your first song in Simple Mode, with 10 beginner prompts to try", 11]
        ]
      },
      {
        "title": "Module 3: Day 2 — The GMIV Formula",
        "lectures": [
          ["The GMIV formula: weak vs strong prompts", 11],
          ["20 prompt templates by genre", 11],
          ["Common prompt mistakes and a practice task", 11]
        ]
      },
      {
        "title": "Module 4: Day 3 — Custom Mode & Meta Tags",
        "lectures": [
          ["Simple Mode vs Custom Mode, with an example lyric sheet", 11],
          ["All meta tags explained: structure, vocal, mood and sound", 11],
          ["Write your own lyrics with ChatGPT, NotebookLM or templates", 10]
        ]
      },
      {
        "title": "Module 5: Day 4 — Suno Studio",
        "lectures": [
          ["What Suno Studio is, and extending a song", 10],
          ["Using stems, exporting and publishing your song", 10]
        ]
      },
      {
        "title": "Module 6: Day 5 — Audio Upload & Your Voice",
        "lectures": [
          ["The 6 audio upload modes", 10],
          ["Use your own voice: record, upload, add a style prompt", 10],
          ["Clone your voice with Persona", 10],
          ["10 audio upload prompts (hum, voice recording, sample, add vocals, inspo, mashup) and the Day 5 capstone", 10]
        ]
      },
      {
        "title": "Module 7: Frameworks Recap & Wrap-Up",
        "lectures": [
          ["The frameworks behind every song: GMIV and meta tags", 10],
          ["Daily exercises and learner outputs", 10],
          ["Where to go next", 10]
        ]
      }
    ],
    "requirements": [
      "No music or AI experience needed",
      "A computer or phone with a modern browser",
      "A free Suno account (free daily credits)",
      "Suno Studio, stems, higher upload limits and commercial rights need a paid Suno plan (Pro or Premier)",
      "A free Google account for NotebookLM, and a free ChatGPT account",
      "A microphone or phone for recording your voice (Day 5)"
    ],
    "audience": [
      "Learners continuing the AI Filmmaking Mastery series",
      "Content creators and YouTubers who want original background music and songs",
      "Businesses that want jingles and brand songs",
      "Anyone who wants to create songs for birthdays, weddings, festivals and special occasions",
      "Aspiring musicians and lyricists who want to hear their ideas as full songs"
    ],
    "description": [
      "Stop just generating AI songs. Learn how to design them.",
      "Anyone can type \"make a happy song\" and press Create. This course teaches you to direct the music: the genre, the mood, the instruments, the vocals, the structure and the lyrics, so the song you hear is the song you imagined.",
      "What you'll master:",
      "• Turn ideas into songs",
      "• The GMIV prompt formula",
      "• Genre-based prompting, including Bollywood, Hindi and devotional",
      "• Write and structure your own lyrics",
      "• Control songs with meta tags",
      "• Suno Studio",
      "• Extend songs and work with stems",
      "• Bring your own voice",
      "• Audio uploads: hum, sample, cover, mashup",
      "• Complete AI music productions",
      "Idea → Music direction → Lyrics → Voice → Production",
      "The goal isn't just \"learn Suno.\" It's to understand how songs are built. Tools change, but your ability to conceptualise, structure, direct and produce music stays with you.",
      "This is Part 9 of the AI Filmmaking Mastery series. The songs and scores you create here become the soundtrack for your AI films."
    ],
    "includes": [
      "7 modules, about 3.5 hours of learning",
      "A 5-day learning plan with daily practice tasks",
      "20 lessons",
      "The GMIV prompt formula",
      "20 genre prompt templates, including Bollywood, Hindi and devotional",
      "A complete meta tag reference: structure, vocal, mood and sound",
      "Lyric templates and a ChatGPT lyric prompt",
      "10 audio upload prompts and a Day 5 capstone",
      "9 knowledge checks with 18 questions",
      "Certificate of completion",
      "Access for 14 days"
    ],
    "level": "Beginner",
    "language": "English"
  },
};
