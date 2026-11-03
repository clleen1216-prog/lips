import { floor } from "./fab";
import type { Story } from "./stories";

export const moreFabStories: Story[] = [
  floor({
    id: "fab-excursion",
    title: "Alarm at 3 a.m.",
    topic: "Reporting an excursion",
    scene: "The phone rings before the sky is light. A number has left its limits.",
    partner: "Dan, night lead",
    text: `The phone buzzes at 3:07. Maya is awake before she knows why.

Dan's voice is flat. "Tell me it's small."

"I can't. {{fab-we-have-an-excursion}} on etch two."

"Which number?"

"Thickness is {{fab-out-of-spec}}. High, and still climbing."

Dan breathes out. "{{fab-how-many-lots}} since it started?"

"Checking. But {{fab-lets-stop-the-line}} until we understand it. One bad hour is cheaper than five."`,
    beats: [
      {
        id: "fab-we-have-an-excursion",
        text: "we have an excursion",
        meaning: "a measurement went outside its allowed limit",
        partner: "Dan here. Why are you calling at this hour?",
        cue: "Open with the headline, not the backstory.",
        you: "We have an excursion on etch two.",
      },
      {
        id: "fab-out-of-spec",
        text: "out of spec",
        meaning: "outside the limits the customer or the process allows",
        partner: "Which number is wrong?",
        cue: "Name the problem in a few plain words.",
        you: "Thickness is out of spec.",
      },
      {
        id: "fab-how-many-lots",
        text: "how many lots",
        meaning: "ask how big the problem is",
        partner: "It started about an hour ago.",
        cue: "Ask about size before you ask about cause.",
        you: "How many lots have run since then?",
      },
      {
        id: "fab-lets-stop-the-line",
        text: "let's stop the line",
        meaning: "pause production so no more bad parts are made",
        partner: "Four lots. Maybe five.",
        cue: "Recommend the safe action clearly.",
        you: "Let's stop the line until we know why.",
      },
    ],
  }),
  floor({
    id: "fab-audit",
    title: "The auditor's pen",
    topic: "Customer audit",
    scene: "A visitor with a clipboard reads every label twice.",
    partner: "Ms. Lin, auditor",
    text: `Ms. Lin stops at the third bay and taps the clipboard with her pen. Not unkindly. Just thoroughly.

"Where is the record for this lot?"

"{{fab-let-me-show-you}}," Maya says, and opens the log before the question can settle.

"Is this how the step is normally done?"

"Yes, {{fab-as-per-procedure}}. Section fourteen."

"And last month's calibration?"

"{{fab-i-dont-have-it-to-hand}}. I'll bring it in ten minutes."

Ms. Lin points at a label. "This date is wrong."

"{{fab-good-catch}}. Our {{fab-corrective-action}} is to retrain the shift by Friday."`,
    beats: [
      {
        id: "fab-let-me-show-you",
        text: "let me show you",
        meaning: "you will point to the proof instead of only describing it",
        partner: "Where is the record for this lot?",
        cue: "Don't describe it. Open it.",
        you: "Let me show you the log.",
      },
      {
        id: "fab-as-per-procedure",
        text: "as per procedure",
        meaning: "exactly as the written steps say",
        partner: "Is this how it's normally done?",
        cue: "Point to the written rule, not to habit.",
        you: "Yes, as per procedure fourteen.",
      },
      {
        id: "fab-i-dont-have-it-to-hand",
        text: "I don't have it to hand",
        meaning: "the document is not with you right now",
        partner: "Show me last month's calibration.",
        cue: "Be honest, then give a time.",
        you: "I don't have it to hand. I'll bring it in ten minutes.",
      },
      {
        id: "fab-good-catch",
        text: "good catch",
        meaning: "you noticed a real problem, thank you",
        partner: "This label is dated wrong.",
        cue: "Accept the finding. Do not defend it.",
        you: "Good catch. We'll fix it today.",
      },
      {
        id: "fab-corrective-action",
        text: "corrective action",
        meaning: "the fix for a problem that was found",
        partner: "What will you do about it?",
        cue: "Name the fix and the date in one sentence.",
        you: "Our corrective action is to retrain the shift by Friday.",
      },
    ],
  }),
  floor({
    id: "fab-rootcause",
    title: "Cause, not blame",
    topic: "Root cause meeting",
    scene: "Six people, one whiteboard, and a name nobody wants to write on it.",
    partner: "Hao, process engineer",
    text: `The whiteboard says SCRAP in red. Under it, someone has already written an operator's name.

Maya picks up the eraser. "Before we go further, let's find the {{fab-root-cause}} first."

Hao crosses his arms. "The operator skipped the check."

"Then it's {{fab-five-whys}}. Why was it skipped?"

"Because the screen froze."

"Good. Could it be the gas supply too?"

"We can {{fab-rule-out}} the gas. The flow log is flat all week."

By the end of the hour the board has a new column. "The {{fab-preventive-action}} is a software fix, not a talk to a person."`,
    beats: [
      {
        id: "fab-root-cause",
        text: "root cause",
        meaning: "the deepest reason the problem happened",
        partner: "So who missed it?",
        cue: "Move the room from who to why.",
        you: "Let's find the root cause first.",
      },
      {
        id: "fab-five-whys",
        text: "five whys",
        meaning: "keep asking why until you reach the real reason",
        partner: "The operator skipped the check.",
        cue: "Ask one more why, calmly.",
        you: "Why was it skipped? Let's do the five whys.",
      },
      {
        id: "fab-rule-out",
        text: "rule out",
        meaning: "prove that something is not the cause",
        partner: "Could it be the gas supply?",
        cue: "Say how you will eliminate it.",
        you: "We can rule out the gas. The flow log is flat.",
      },
      {
        id: "fab-preventive-action",
        text: "preventive action",
        meaning: "a change so the problem cannot happen again",
        partner: "So what changes on Monday?",
        cue: "Finish with the change, not the lesson.",
        you: "The preventive action is a software fix.",
      },
    ],
  }),
  floor({
    id: "fab-down",
    title: "Tool is down",
    topic: "Equipment down call",
    scene: "A lot waits in the carrier. The tool's screen is red.",
    partner: "Ken, equipment engineer",
    text: `The screen has been red for four minutes. Maya calls equipment.

"Ken."

"{{fab-the-tool-is-down}}. Etcher two."

"When?"

"It {{fab-went-down-around}} two o'clock. {{fab-its-showing}} a vacuum alarm."

"Okay. I'll bring a pump kit."

"Thanks. {{fab-whats-the-eta}}? I have two hot lots waiting."

Ken laughs. "Ask me again when I'm there."

Maya reroutes what she can. "{{fab-ill-reroute-the-lots}}. Etcher three has room."`,
    beats: [
      {
        id: "fab-the-tool-is-down",
        text: "the tool is down",
        meaning: "the machine has stopped working",
        partner: "Equipment. What's wrong?",
        cue: "Say it plainly. Name the tool.",
        you: "Etcher two is down.",
      },
      {
        id: "fab-went-down-around",
        text: "went down around",
        meaning: "stopped working at roughly this time",
        partner: "When did it stop?",
        cue: "Give a time, not a guess about why.",
        you: "It went down around two o'clock.",
      },
      {
        id: "fab-its-showing",
        text: "it's showing",
        meaning: "the screen displays this message",
        partner: "Any error on the screen?",
        cue: "Read the screen, don't interpret it.",
        you: "It's showing a vacuum alarm.",
      },
      {
        id: "fab-whats-the-eta",
        text: "what's the ETA",
        meaning: "ask when the tool will be ready again",
        partner: "I'm coming with a pump kit.",
        cue: "Ask for a time you can plan around.",
        you: "What's the ETA? I have two hot lots waiting.",
      },
      {
        id: "fab-ill-reroute-the-lots",
        text: "I'll reroute the lots",
        meaning: "you will send the lots to another tool",
        partner: "Don't wait on me.",
        cue: "Take the next action yourself.",
        you: "I'll reroute the lots to etcher three.",
      },
    ],
  }),
  floor({
    id: "fab-safety",
    title: "Red light, green light",
    topic: "Safety and cleanroom rules",
    scene: "Rules in a fab are short because they are serious.",
    partner: "Mei, safety officer",
    text: `A visitor stands at the yellow line, holding a phone like a small, shiny problem.

"{{fab-please-gown-up}} before you go in," Mei says. Her smile is friendly. Her voice is not negotiable.

"Can I bring my phone?"

"Phones are {{fab-not-allowed}} past this line."

"And the goggles?"

"They're {{fab-for-your-safety}}. The chemicals splash."

Later a light starts flashing over the wet bench. Mei's voice changes. "{{fab-stop-work}}. Everyone out. Walk, don't run."

Nobody argues. That is what practice is for.`,
    beats: [
      {
        id: "fab-please-gown-up",
        text: "please gown up",
        meaning: "put on the full cleanroom suit",
        partner: "Is this the way in?",
        cue: "Remind a visitor politely and clearly.",
        you: "Please gown up before you go in.",
      },
      {
        id: "fab-not-allowed",
        text: "not allowed",
        meaning: "against the rules",
        partner: "Can I bring my phone?",
        cue: "Say no without sounding harsh.",
        you: "Phones aren't allowed past this line.",
      },
      {
        id: "fab-for-your-safety",
        text: "for your safety",
        meaning: "because the rule protects you",
        partner: "Why do I need the goggles?",
        cue: "Give the reason in one line.",
        you: "They're for your safety. The chemicals splash.",
      },
      {
        id: "fab-stop-work",
        text: "stop work",
        meaning: "everyone pauses because something is unsafe",
        partner: "The alarm over the wet bench is flashing!",
        cue: "Say the strong phrase. Stay calm.",
        you: "Stop work. Everyone out, please. Walk, don't run.",
      },
    ],
  }),
  floor({
    id: "fab-email",
    title: "Subject line",
    topic: "Writing a work email",
    scene: "The cursor blinks. Three people will read the first sentence.",
    partner: "Priya, process",
    text: `Maya types the subject line first: Lot 4471 hold. Then the opening sentence, slowly.

"{{fab-following-up-on}} yesterday's lot report, here is the current status."

She adds the file. "{{fab-please-find-attached}} the trend chart."

Then the request, kept short. "{{fab-could-you-please}} confirm the hold by noon?"

An email should not leave a door open. "{{fab-let-me-know-if}} anything looks off."

And the last line, easy to forget. "{{fab-thanks-in-advance}}."

She reads it once as a stranger would. Then she presses send.`,
    beats: [
      {
        id: "fab-following-up-on",
        text: "following up on",
        meaning: "continuing from an earlier message or meeting",
        partner: "Which message are you answering?",
        cue: "Point back to what you are continuing.",
        you: "Following up on yesterday's lot report,",
      },
      {
        id: "fab-please-find-attached",
        text: "please find attached",
        meaning: "the file is attached to this email",
        partner: "Do you have the chart?",
        cue: "Introduce the file in a formal, clear way.",
        you: "Please find attached the trend chart.",
      },
      {
        id: "fab-could-you-please",
        text: "could you please",
        meaning: "a polite request in writing",
        partner: "What do you need from me?",
        cue: "Ask for one thing and a time.",
        you: "Could you please confirm the hold by noon?",
      },
      {
        id: "fab-let-me-know-if",
        text: "let me know if",
        meaning: "tell me if there is a problem",
        partner: "Anything else?",
        cue: "Invite a reply without begging for one.",
        you: "Let me know if anything looks off.",
      },
      {
        id: "fab-thanks-in-advance",
        text: "thanks in advance",
        meaning: "thank you before they have done the task",
        partner: "Are we done?",
        cue: "Close the email warmly in three words.",
        you: "Thanks in advance.",
      },
    ],
  }),
  floor({
    id: "fab-phone",
    title: "Bad line",
    topic: "Phone call with a supplier",
    scene: "A call to another country, and the signal keeps dropping words.",
    partner: "Tom, supplier rep",
    text: `Tom is calling from a car. Half of every sentence is wind.

"Sorry, {{fab-the-line-is-bad}}," Maya says. "{{fab-could-you-say-that-again}}?"

Tom repeats it, slower.

"{{fab-a-bit-slower}}, please. I want to write the lot number down."

She writes it. Then she reads it back, so there is no room for a wrong digit. "{{fab-let-me-repeat-that-back}}: lot A, forty wafers."

"That's right."

"Good. {{fab-ill-send-it-in-writing}} so we both have the record."`,
    beats: [
      {
        id: "fab-the-line-is-bad",
        text: "the line is bad",
        meaning: "you cannot hear them clearly",
        partner: "...the shipment ... Thursday ...",
        cue: "Tell them the problem is the connection, not them.",
        you: "Sorry, the line is bad.",
      },
      {
        id: "fab-could-you-say-that-again",
        text: "could you say that again",
        meaning: "please repeat what you said",
        partner: "Did you get that?",
        cue: "Ask for a repeat. Never guess a number.",
        you: "Could you say that again, please?",
      },
      {
        id: "fab-a-bit-slower",
        text: "a bit slower",
        meaning: "speak with less speed",
        partner: "Lot four-four-seven-one.",
        cue: "Ask politely for a lower speed.",
        you: "A bit slower, please. I'm writing it down.",
      },
      {
        id: "fab-let-me-repeat-that-back",
        text: "let me repeat that back",
        meaning: "say it again to check you heard it correctly",
        partner: "Lot A. Forty wafers.",
        cue: "Confirm before you hang up.",
        you: "Let me repeat that back: lot A, forty wafers.",
      },
      {
        id: "fab-ill-send-it-in-writing",
        text: "I'll send it in writing",
        meaning: "you will email it so there is a record",
        partner: "Anything else to confirm?",
        cue: "Close with a record, not a promise.",
        you: "I'll send it in writing so we both have it.",
      },
    ],
  }),
  floor({
    id: "fab-evidence",
    title: "What makes you say that",
    topic: "Backing up your point",
    scene: "A good idea with no numbers behind it lasts about ten seconds.",
    partner: "Ethan, manager",
    text: `Ethan leans back. "So what's going on with the drift?"

"{{fab-my-read-is}} it's the new gas bottle."

"{{fab-what-makes-you-say-that}}?"

"{{fab-thats-based-on}} three lots, all on the same tool, all after the change."

Ethan nods slowly. "Three isn't many."

"True. It's a {{fab-small-sample}}, so I'm not certain."

"So what do you need?"

"{{fab-id-want-more-data}} before we change the recipe."

Ethan almost smiles. That is the answer he was waiting for.`,
    beats: [
      {
        id: "fab-my-read-is",
        text: "my read is",
        meaning: "my honest interpretation, not a proven fact",
        partner: "So what's going on with the drift?",
        cue: "Give your view and show it is a view.",
        you: "My read is it's the new gas bottle.",
      },
      {
        id: "fab-what-makes-you-say-that",
        text: "what makes you say that",
        meaning: "ask for their reason, politely",
        partner: "It's obviously the recipe.",
        cue: "Ask for their evidence without attacking.",
        you: "What makes you say that?",
      },
      {
        id: "fab-thats-based-on",
        text: "that's based on",
        meaning: "these are the facts behind my statement",
        partner: "Why the gas bottle?",
        cue: "Give the facts in one sentence.",
        you: "That's based on three lots, same tool, after the change.",
      },
      {
        id: "fab-small-sample",
        text: "small sample",
        meaning: "not enough data to be sure",
        partner: "Three isn't many.",
        cue: "Agree, and be honest about the limit.",
        you: "True. It's a small sample, so I'm not certain.",
      },
      {
        id: "fab-id-want-more-data",
        text: "I'd want more data",
        meaning: "you would like more proof before deciding",
        partner: "So what do you need?",
        cue: "Ask for what makes the decision safe.",
        you: "I'd want more data before we change the recipe.",
      },
    ],
  }),
  floor({
    id: "fab-yieldreview",
    title: "Yield review",
    topic: "Weekly yield meeting",
    scene: "One slide, one number, and a vice president who reads quickly.",
    partner: "Grace, VP of operations",
    text: `Grace does not look up from the slide. "Give me the headline."

"{{fab-yield-is-down}} two points this week."

"Why?"

"It's {{fab-driven-by}} one lot family. The other lots are normal."

"And the recovery?"

"{{fab-on-track}} for Friday."

Grace finally looks up. "What about the customer?"

Maya doesn't soften it. "The Thursday shipment is {{fab-at-risk}}."

"What do you need?"

"{{fab-i-need-support-from}} equipment on the tool check."`,
    beats: [
      {
        id: "fab-yield-is-down",
        text: "yield is down",
        meaning: "fewer good chips than usual",
        partner: "Give me the headline.",
        cue: "Say the number's direction first.",
        you: "Yield is down two points this week.",
      },
      {
        id: "fab-driven-by",
        text: "driven by",
        meaning: "mainly caused by",
        partner: "Why?",
        cue: "Name the main cause, not every cause.",
        you: "It's driven by one lot family.",
      },
      {
        id: "fab-on-track",
        text: "on track",
        meaning: "going as planned",
        partner: "And the recovery?",
        cue: "Answer in five words and give a date.",
        you: "On track for Friday.",
      },
      {
        id: "fab-at-risk",
        text: "at risk",
        meaning: "might not happen as planned",
        partner: "What about the customer?",
        cue: "Say the uncomfortable thing plainly.",
        you: "The Thursday shipment is at risk.",
      },
      {
        id: "fab-i-need-support-from",
        text: "I need support from",
        meaning: "you are asking a specific group for help",
        partner: "What do you need?",
        cue: "Ask for one thing from one group.",
        you: "I need support from equipment on the tool check.",
      },
    ],
  }),
  floor({
    id: "fab-pm",
    title: "Maintenance window",
    topic: "Scheduling maintenance",
    scene: "Production wants the tool. Equipment wants the tool. Only one can have it.",
    partner: "Ken, equipment engineer",
    text: `The tool has run for six weeks without a break. The sticker says PM due.

Maya finds Ken at the board. "{{fab-whens-a-good-time}} for maintenance?"

"The {{fab-pm-is-due}} Thursday."

"Thursday is our biggest ship day." She tries the polite version. "Can we {{fab-push-it-back}} to Saturday?"

Ken shakes his head. "We can't skip it. We can delay it a little."

"{{fab-how-long-will-it-take}}?"

"Six hours. Maybe seven."

"Then {{fab-lock-it-in}} for Saturday morning."`,
    beats: [
      {
        id: "fab-whens-a-good-time",
        text: "when's a good time",
        meaning: "ask the other person to help choose a time",
        partner: "Equipment, what's up?",
        cue: "Ask for a time that works for both of you.",
        you: "When's a good time for maintenance?",
      },
      {
        id: "fab-pm-is-due",
        text: "PM is due",
        meaning: "scheduled maintenance must be done soon",
        partner: "The sticker says Thursday.",
        cue: "State the fact. You can negotiate after.",
        you: "The PM is due Thursday.",
      },
      {
        id: "fab-push-it-back",
        text: "push it back",
        meaning: "move it to a later time",
        partner: "Thursday is our biggest ship day.",
        cue: "Ask for a small delay, not a skip.",
        you: "Can we push it back to Saturday?",
      },
      {
        id: "fab-how-long-will-it-take",
        text: "how long will it take",
        meaning: "ask for the length of the work",
        partner: "We can delay, but not skip.",
        cue: "Ask the number you need to plan.",
        you: "How long will it take?",
      },
      {
        id: "fab-lock-it-in",
        text: "lock it in",
        meaning: "make the plan final",
        partner: "Six hours. Maybe seven.",
        cue: "Close the decision before you leave.",
        you: "Then let's lock it in for Saturday morning.",
      },
    ],
  }),
];
