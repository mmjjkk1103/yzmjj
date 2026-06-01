# Product Spec: AI Schedule Analysis Studio

## Product Purpose

Help Korean-first users turn vague daily goals into practical execution plans, study paths, research keywords, resource collection boards, and small concrete outputs.

## Primary Flows

1. User opens the page and enters numbered daily goals.
2. User chooses analysis depth, available time, and desired output type.
3. The app parses each goal and renders deterministic demo analysis cards.
4. The app provides execution direction, study routes, research keywords, resource placeholders, image guidance, daily plan, checklist, and resource board.
5. User copies the result as plain text or markdown/Notion-friendly structured text.

## UX Requirements

- Korean-first page metadata and visible copy are preferred.
- The app must work on mobile and desktop.
- Empty goal input is rejected by focusing the input.
- User-entered goal text must remain plain text.
- Copy failure must not break the page.
- Demo resource recommendations must not invent real URLs.
- Resource sections should show search keywords, recommended platforms, and “actual link connection planned” language until real search APIs are connected.

## Open Product Questions

- Which API provider should supply real AI analysis first?
- Which search provider should supply verified URLs first?
- Should resource board notes persist after refresh?
- Where will the app be deployed?

## Legacy Product Track: Message Recommender

The repository previously hosted a family encouragement message recommender. Treat that as legacy context unless a task explicitly asks to restore or maintain it.

## New MVP Product Track: Investment Hypothesis Research Engine

The repository now also contains an MVP for a Korean-first financial research assistant. This tool is not a stock recommendation, investment advisory, target-price, discretionary investment, or automated trading service.

Primary questions:

- Why did the company decline?
- Is the cause market-wide, industry-wide, or company-specific?
- Is the negative event temporary or structural?
- Is the core business still intact?
- Can the company withstand the issue financially?
- Are recovery catalysts observable?
- What conditions invalidate the investment hypothesis?
- Which filings and news should be checked next?

Required safety copy must stay visible in the UI:

“본 서비스는 공개 공시, 재무제표, 뉴스 데이터를 기반으로 투자 아이디어를 정리하는 교육용·리서치 보조 도구입니다. 특정 종목의 매수·매도 추천, 목표가 제시, 투자자문 또는 투자일임을 제공하지 않습니다. 모든 투자 판단과 책임은 이용자 본인에게 있으며, 실제 투자 전에는 사업보고서, 공시, 재무제표, 산업 전망을 직접 확인해야 합니다.”

## Default Static Product Track: AI Schedule Analysis Studio

The root `index.html` now serves a Korean-first static demo for turning numbered daily goals into an execution plan. It is not connected to a real AI API yet.

Primary flows:

- User enters numbered daily goals.
- User can load the built-in example goals.
- The app parses goals locally and renders per-goal analysis cards.
- Each goal includes interpretation, execution direction, today actions, study routes, research keywords, resource recommendation placeholders, image guidance, priority, expected output, and expansion direction.
- The app renders a combined morning/afternoon/evening/night plan.
- The app renders a checklist and resource collection board for YouTube, blogs, papers, images, and other links.
- User can copy the result as plain text or markdown/Notion-friendly structured text.

Behavior requirements:

- Keep the analysis practical and realistic, including “too much for today” guidance when goal count is high.
- Keep beginner-friendly Korean copy.
- Keep output deterministic until a real AI API is approved.
- Do not send user-entered goals to external APIs without a security review.
- Do not invent URLs in the demo. Show “actual link connection planned” plus search keywords and recommended platforms until a search API is connected.
- Future API seams may include OpenAI, YouTube Data API, Google Custom Search, SerpAPI/Tavily/Brave Search, Unsplash, Crossref, arXiv, Notion, and Google Calendar.
