import { floor } from "./fab";
import type { Story } from "./stories";

export const fabStoriesThree: Story[] = [
  floor({
    id: "fab-shiftchange",
    title: "Six a.m.",
    topic: "Shift change greetings",
    scene: "The night crew is tired. The day crew is not yet awake. Everyone is polite.",
    partner: "Dan, night lead",
    text: `The corridor smells of coffee and cleanroom wipes. Dan is already holding his bag.

"{{fab-morning-how-was-the-night}}?" Maya asks.

"Long. But nothing broke." He laughs. "{{fab-quiet-for-the-most-part}}, until four."

"What happened at four?"

"One alarm on etch two. Cleared in ten minutes."

"Good to know. {{fab-anything-i-should-know}} before I start?"

"Lot 7701 is on hold. Notes are on the board."

"Thanks. {{fab-thanks-ill-take-it-from-here}}."

Dan picks up his bag. "{{fab-get-some-rest}}, Dan," Maya adds, and he waves without turning around.`,
    beats: [
      {
        id: "fab-morning-how-was-the-night",
        text: "how was the night",
        meaning: "a friendly opening at shift change",
        partner: "Morning, Maya.",
        cue: "Start light. Ask about the shift, not the work.",
        you: "Morning! How was the night?",
      },
      {
        id: "fab-quiet-for-the-most-part",
        text: "quiet for the most part",
        meaning: "mostly calm, with one small exception",
        partner: "How was the night shift for you?",
        cue: "Give the headline, then the exception.",
        you: "Quiet for the most part, until four.",
      },
      {
        id: "fab-anything-i-should-know",
        text: "anything I should know",
        meaning: "ask for important information before you begin",
        partner: "One alarm on etch two. Cleared in ten minutes.",
        cue: "Ask the one question that protects your shift.",
        you: "Anything I should know before I start?",
      },
      {
        id: "fab-thanks-ill-take-it-from-here",
        text: "I'll take it from here",
        meaning: "you now own the work, and they can go",
        partner: "Lot 7701 is on hold. The notes are on the board.",
        cue: "Take the handover clearly and kindly.",
        you: "Thanks. I'll take it from here.",
      },
      {
        id: "fab-get-some-rest",
        text: "get some rest",
        meaning: "a kind goodbye to someone who has worked all night",
        partner: "Okay, I'm heading home.",
        cue: "Close with warmth, in three words.",
        you: "Get some rest, Dan.",
      },
    ],
  }),
  floor({
    id: "fab-fa",
    title: "Under the microscope",
    topic: "Failure analysis meeting",
    scene: "A cross-section image is on screen. Six people lean in.",
    partner: "Hao, failure analysis",
    text: `Hao enlarges the image until the cracks look like a river map.

"{{fab-what-are-we-looking-at}}?" Maya asks.

"A cross-section of the failed die. This dark line is the crack."

"{{fab-where-does-it-start}}?"

"Near the edge. The corner of the pad."

"That matches the stress we saw in the last lot." She pauses. "{{fab-is-this-consistent-with}} a die-attach problem?"

"It is. But {{fab-i-wouldnt-rule-out}} a material issue yet."

"Then what do we do next?"

"{{fab-lets-confirm-with}} a second sample before we blame anyone."`,
    beats: [
      {
        id: "fab-what-are-we-looking-at",
        text: "what are we looking at",
        meaning: "ask what the image or data shows",
        partner: "Here is the cross-section.",
        cue: "Ask before you interpret.",
        you: "What are we looking at here?",
      },
      {
        id: "fab-where-does-it-start",
        text: "where does it start",
        meaning: "ask for the origin of a crack or a defect",
        partner: "The dark line is the crack.",
        cue: "Ask the question that leads to the cause.",
        you: "Where does it start?",
      },
      {
        id: "fab-is-this-consistent-with",
        text: "is this consistent with",
        meaning: "ask whether the evidence agrees with an idea",
        partner: "Near the corner of the pad.",
        cue: "Connect new evidence to a possible cause.",
        you: "Is this consistent with a die-attach problem?",
      },
      {
        id: "fab-i-wouldnt-rule-out",
        text: "I wouldn't rule out",
        meaning: "something is still possible and should stay on the list",
        partner: "It is. So it's die attach.",
        cue: "Stay careful. Keep the other option open.",
        you: "I wouldn't rule out a material issue yet.",
      },
      {
        id: "fab-lets-confirm-with",
        text: "let's confirm with",
        meaning: "check with more evidence before deciding",
        partner: "So what do we do next?",
        cue: "Recommend the next test, not a conclusion.",
        you: "Let's confirm with a second sample before we blame anyone.",
      },
    ],
  }),
  floor({
    id: "fab-8dreview",
    title: "Eight steps",
    topic: "Reviewing an 8D report",
    scene: "The customer wants the report in ten days. The reviewer wants it right.",
    partner: "Ms. Kim, reviewer",
    text: `Ms. Kim reads slowly. She underlines in a very thin pen.

"Your containment looks fine. But the root cause is vague."

"Fair point. {{fab-fair-point-ill-tighten-it}}. What would make it stronger?"

"Show the data. {{fab-whats-the-evidence-for}} the gas bottle?"

"{{fab-the-data-shows-three-lots}} three lots, all on one bottle, all after the change."

"And how do you know the fix works?"

"We {{fab-verified-with}} two weeks of monitor wafers. No failures."

Ms. Kim nods. "{{fab-please-add-that-to-the-report}}. Then I can approve."`,
    beats: [
      {
        id: "fab-fair-point-ill-tighten-it",
        text: "I'll tighten it",
        meaning: "you will make the section clearer and stronger",
        partner: "The root cause is a bit vague.",
        cue: "Accept the feedback, then ask how to improve.",
        you: "Fair point. I'll tighten it. What would make it stronger?",
      },
      {
        id: "fab-whats-the-evidence-for",
        text: "what's the evidence for",
        meaning: "ask for the proof behind a claim",
        partner: "Show me the data.",
        cue: "Ask for proof in a calm and professional way.",
        you: "What's the evidence for the gas bottle theory?",
      },
      {
        id: "fab-the-data-shows-three-lots",
        text: "the data shows",
        meaning: "you are pointing to facts, not opinions",
        partner: "So what's your evidence?",
        cue: "Lead with data, not with feelings.",
        you: "The data shows three lots, all on one bottle, all after the change.",
      },
      {
        id: "fab-verified-with",
        text: "verified with",
        meaning: "the fix was checked and proved by a test",
        partner: "How do you know the fix works?",
        cue: "Name the test that proved it.",
        you: "We verified it with two weeks of monitor wafers. No failures.",
      },
      {
        id: "fab-please-add-that-to-the-report",
        text: "please add that to the report",
        meaning: "write this information into the document",
        partner: "Good. That's what I wanted to see.",
        cue: "Say what you will write, and when.",
        you: "I'll add that to the report today.",
      },
    ],
  }),
  floor({
    id: "fab-supaudit",
    title: "Walking the supplier floor",
    topic: "Auditing a supplier",
    scene: "You are the visitor this time. Their pride is in every labeled shelf.",
    partner: "Mr. Chang, supplier quality manager",
    text: `The supplier's cleanroom is smaller than yours. It is also very, very tidy.

"Welcome. {{fab-thank-you-for-having-us}}," Maya says.

"Please. Ask whatever you like."

She stops at a shelf. "{{fab-how-do-you-control}} the incoming batch records?"

"Each batch has a barcode and a log."

"May I see one?" She flips through it. "{{fab-i-noticed-that}} the last calibration date is missing."

Mr. Chang looks at the page, then at her. "You're right."

"It's {{fab-an-observation-not-a-finding}} for now. {{fab-well-follow-up-in-writing}} within a week."`,
    beats: [
      {
        id: "fab-thank-you-for-having-us",
        text: "thank you for having us",
        meaning: "a polite thanks from a visitor to the host",
        partner: "Welcome to our facility.",
        cue: "Thank the host first, warmly and briefly.",
        you: "Thank you for having us.",
      },
      {
        id: "fab-how-do-you-control",
        text: "how do you control",
        meaning: "ask what process they use to manage something",
        partner: "Ask whatever you like.",
        cue: "Ask about the process, not about a person.",
        you: "How do you control the incoming batch records?",
      },
      {
        id: "fab-i-noticed-that",
        text: "I noticed that",
        meaning: "a gentle way to point out something you saw",
        partner: "Each batch has a barcode and a log.",
        cue: "Point to a fact in a neutral way.",
        you: "I noticed that the last calibration date is missing.",
      },
      {
        id: "fab-an-observation-not-a-finding",
        text: "an observation",
        meaning: "a note about something, not yet a formal problem",
        partner: "Is this going to be a finding?",
        cue: "Say how serious it is, calmly.",
        you: "For now it's an observation, not a finding.",
      },
      {
        id: "fab-well-follow-up-in-writing",
        text: "we'll follow up in writing",
        meaning: "you will send an official message after the visit",
        partner: "What happens next?",
        cue: "End with a clear next step and a time.",
        you: "We'll follow up in writing within a week.",
      },
    ],
  }),
  floor({
    id: "fab-hq",
    title: "Headquarters, 9 p.m.",
    topic: "Call with head office",
    scene: "The call is late for you and early for them. Both sides try to be short.",
    partner: "Ms. Anderson, head office",
    text: `The line crackles once, then clears.

"Maya, thanks for joining so late."

"{{fab-no-problem-at-all}}. {{fab-i-have-the-numbers-here}}, so I can answer questions."

"Good. Your yield dropped. Why?"

"{{fab-the-main-driver-is}} one tool, etch two. We replaced a part last week."

"What's the plan?"

"{{fab-we-expect-to-recover-by}} Friday, if the second monitor passes."

Ms. Anderson takes a breath. "Please send me a summary. Just a page."

"{{fab-ill-send-it-tonight}}."`,
    beats: [
      {
        id: "fab-no-problem-at-all",
        text: "no problem at all",
        meaning: "a polite, warm way to say it is no trouble",
        partner: "Thanks for joining so late.",
        cue: "Reply warmly and briefly.",
        you: "No problem at all.",
      },
      {
        id: "fab-i-have-the-numbers-here",
        text: "I have the numbers here",
        meaning: "you have the data ready",
        partner: "Let's go through yield.",
        cue: "Show you are ready, in one sentence.",
        you: "I have the numbers here, so I can answer questions.",
      },
      {
        id: "fab-the-main-driver-is",
        text: "the main driver is",
        meaning: "the biggest cause is",
        partner: "Your yield dropped. Why?",
        cue: "Name the biggest cause first.",
        you: "The main driver is one tool, etch two.",
      },
      {
        id: "fab-we-expect-to-recover-by",
        text: "we expect to recover by",
        meaning: "you predict when things will return to normal",
        partner: "What's the plan?",
        cue: "Give a date and a condition.",
        you: "We expect to recover by Friday, if the second monitor passes.",
      },
      {
        id: "fab-ill-send-it-tonight",
        text: "I'll send it tonight",
        meaning: "you promise to deliver something today",
        partner: "Please send me a one-page summary.",
        cue: "Accept the task and give a time.",
        you: "I'll send it tonight.",
      },
    ],
  }),
];
