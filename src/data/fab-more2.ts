import { floor } from "./fab";
import type { Story } from "./stories";

export const fabStoriesTwo: Story[] = [
  floor({
    id: "fab-complaint",
    title: "Customer on the line",
    topic: "Customer complaint call",
    scene: "The customer does not shout. That is worse.",
    partner: "Mr. Park, customer quality",
    text: `Mr. Park's voice is calm in the way that means the email before this call was angry.

"We found defects in three of your lots."

"{{fab-thank-you-for-raising-this}}. {{fab-i-apologize-for}} the trouble this has caused your line."

"I need to know what happened."

"{{fab-i-understand-the-concern}}. Right now {{fab-looking-into-it}}, and I won't guess before I have facts."

"When will I hear back?"

"{{fab-youll-have-it-by}} Thursday noon, in writing."

Mr. Park pauses. Then, quieter: "Thank you. That is what I needed to hear."`,
    beats: [
      {
        id: "fab-thank-you-for-raising-this",
        text: "thank you for raising this",
        meaning: "you are grateful they told you about the problem",
        partner: "We found defects in three of your lots.",
        cue: "Thank them first. Do not defend yet.",
        you: "Thank you for raising this.",
      },
      {
        id: "fab-i-apologize-for",
        text: "I apologize for",
        meaning: "a formal, sincere way to say sorry",
        partner: "This stopped our line for a day.",
        cue: "Apologize for the effect on them, not for a guess.",
        you: "I apologize for the trouble this caused your line.",
      },
      {
        id: "fab-i-understand-the-concern",
        text: "I understand the concern",
        meaning: "you show that you heard why they are worried",
        partner: "I need to know what happened.",
        cue: "Show you heard them before you explain anything.",
        you: "I understand the concern.",
      },
      {
        id: "fab-looking-into-it",
        text: "we're looking into it",
        meaning: "the team is investigating and does not have the answer yet",
        partner: "What caused it?",
        cue: "Be honest about what you do not know yet.",
        you: "We're looking into it, and I won't guess before I have facts.",
      },
      {
        id: "fab-youll-have-it-by",
        text: "you'll have it by",
        meaning: "you promise a specific time for the answer",
        partner: "When will I hear back?",
        cue: "Give a day and a time. A vague answer feels like a dodge.",
        you: "You'll have it by Thursday noon, in writing.",
      },
    ],
  }),
  floor({
    id: "fab-trainer",
    title: "Show, then watch",
    topic: "Training a new operator",
    scene: "Lin is on her second day. Her hands are careful. Her questions are quieter than they should be.",
    partner: "Lin, new operator",
    text: `Lin stands a little too straight at the tool, like someone who does not want to touch anything wrong.

"{{fab-watch-me-first}}," Maya says. She loads the carrier slowly, narrating each move.

Then she steps back. "{{fab-now-you-try}}."

Lin's hands shake only a little. Halfway through, she freezes.

"{{fab-take-your-time}}. There's no clock on this one."

By the end, Lin has loaded the whole carrier. "{{fab-youre-getting-it}}," Maya says. "{{fab-any-questions}}?"

Lin hesitates, then asks the question she was too nervous to ask an hour ago.`,
    beats: [
      {
        id: "fab-watch-me-first",
        text: "watch me first",
        meaning: "you will show the step before they try it",
        partner: "Do I just start?",
        cue: "Show first. Do not hand someone a risky task cold.",
        you: "Watch me first, then you try.",
      },
      {
        id: "fab-now-you-try",
        text: "now you try",
        meaning: "it is their turn to do the step",
        partner: "Okay... I think I've got it.",
        cue: "Hand it over with a calm, simple line.",
        you: "Now you try. I'm right here.",
      },
      {
        id: "fab-take-your-time",
        text: "take your time",
        meaning: "there is no pressure to be fast",
        partner: "Sorry, I'm slow.",
        cue: "Remove the pressure in one short line.",
        you: "Take your time. Slow is correct here.",
      },
      {
        id: "fab-youre-getting-it",
        text: "you're getting it",
        meaning: "you can see they are improving",
        partner: "Was that right?",
        cue: "Say the true, encouraging thing.",
        you: "Yes. You're getting it.",
      },
      {
        id: "fab-any-questions",
        text: "any questions",
        meaning: "invite them to ask about what is unclear",
        partner: "I think that's everything.",
        cue: "Invite questions in a way that feels safe.",
        you: "Any questions so far? No question is silly here.",
      },
    ],
  }),
  floor({
    id: "fab-spc",
    title: "The chart moved",
    topic: "Reading a control chart",
    scene: "Nothing has crossed a limit yet. But the line is climbing.",
    partner: "Ravi, process engineer",
    text: `Ravi has the control chart open on his second monitor. He doesn't point. He just tilts the screen.

"It's {{fab-trending-up}} since Monday," Maya says.

"Still {{fab-within-limits}}, though."

"Yes. But look at {{fab-three-points-in-a-row}} on the same side of the center line. That's a pattern, not noise."

Ravi scrolls to this morning. "And this one is {{fab-above-the-limit}}."

"Then it isn't a watch item anymore."

He sighs. "Last week I would have said {{fab-no-action-needed}}. Not today."`,
    beats: [
      {
        id: "fab-trending-up",
        text: "trending up",
        meaning: "the numbers keep rising over time",
        partner: "What do you see on the chart?",
        cue: "Describe the direction, not the cause.",
        you: "It's trending up since Monday.",
      },
      {
        id: "fab-within-limits",
        text: "within limits",
        meaning: "still inside the allowed range",
        partner: "But nothing's out yet.",
        cue: "Agree with the fact, then keep your point.",
        you: "Still within limits, yes. But the direction matters.",
      },
      {
        id: "fab-three-points-in-a-row",
        text: "three points in a row",
        meaning: "a short run of data that suggests a pattern",
        partner: "It could just be noise.",
        cue: "Point to the evidence that it is not noise.",
        you: "That's three points in a row on the same side. That's a pattern.",
      },
      {
        id: "fab-above-the-limit",
        text: "above the limit",
        meaning: "higher than the allowed maximum",
        partner: "And this morning?",
        cue: "State the new fact plainly.",
        you: "This morning's point is above the limit.",
      },
      {
        id: "fab-no-action-needed",
        text: "no action needed",
        meaning: "nobody has to do anything about it",
        partner: "So do we do anything?",
        cue: "Say clearly when something has stopped being safe to ignore.",
        you: "Last week I'd say no action needed. Today I'd open a hold.",
      },
    ],
  }),
  floor({
    id: "fab-release",
    title: "Release or hold",
    topic: "Lot release decision",
    scene: "The lot is done. One number is borderline. Everyone wants a yes.",
    partner: "Grace, operations",
    text: `The lot has been waiting at the last step for an hour. Grace arrives with her coat still on.

"Is it {{fab-ready-to-release}}?"

"Almost. One measurement is {{fab-pending-review}} by the engineer."

"Give me the risk."

"{{fab-the-risk-is-low}}, but not zero. The number sits right at the edge."

Grace doesn't like edges. "So what do you recommend?"

Maya has the answer ready. "{{fab-hold-for-now}} until the second measurement. Two hours. Then I can {{fab-sign-off}} with confidence."`,
    beats: [
      {
        id: "fab-ready-to-release",
        text: "ready to release",
        meaning: "approved to leave the fab and go to the next stage",
        partner: "Can this lot go?",
        cue: "Answer yes or not yet in the first three words.",
        you: "Not yet. It's almost ready to release.",
      },
      {
        id: "fab-pending-review",
        text: "pending review",
        meaning: "waiting for someone to check it",
        partner: "What's holding it?",
        cue: "Name what is missing and who owns it.",
        you: "One measurement is pending review by the engineer.",
      },
      {
        id: "fab-the-risk-is-low",
        text: "the risk is low",
        meaning: "it is unlikely to cause a problem",
        partner: "How risky is it?",
        cue: "Give a fair estimate. Do not oversell it.",
        you: "The risk is low, but not zero.",
      },
      {
        id: "fab-hold-for-now",
        text: "hold for now",
        meaning: "wait before deciding or moving it",
        partner: "So what do you recommend?",
        cue: "Recommend one action with a time limit.",
        you: "Hold for now until the second measurement. Two hours.",
      },
      {
        id: "fab-sign-off",
        text: "sign off",
        meaning: "give your formal approval",
        partner: "And after that?",
        cue: "Say when you will approve it, and on what condition.",
        you: "Then I can sign off with confidence.",
      },
    ],
  }),
  floor({
    id: "fab-overtime",
    title: "Can you stay",
    topic: "Overtime request",
    scene: "A request that sounds like a question, but is not quite one.",
    partner: "Ethan, manager",
    text: `Ethan stops by at 4:40. That is never a good sign.

"We have a lot that needs a final check tonight. {{fab-can-you-stay}}?"

Maya thinks for exactly two seconds. "{{fab-i-can-stay}}. {{fab-until-what-time}}?"

"Probably eight."

"Eight works. But {{fab-i-have-a-commitment}} on Thursday evening, so I'd like to leave on time then."

"Fair. {{fab-can-someone-cover}} Thursday's check?"

"Priya can. And {{fab-ill-make-it-up}} on Friday if you need me."`,
    beats: [
      {
        id: "fab-can-you-stay",
        text: "can you stay",
        meaning: "a request to work later than normal",
        partner: "Honestly, I was about to head home.",
        cue: "You need someone to stay. Ask politely.",
        you: "Can you stay a couple of hours tonight?",
      },
      {
        id: "fab-i-can-stay",
        text: "I can stay",
        meaning: "you agree to work later",
        partner: "We need a final check tonight.",
        cue: "Say yes clearly, and ask about the length.",
        you: "I can stay. Until what time?",
      },
      {
        id: "fab-until-what-time",
        text: "until what time",
        meaning: "ask how late you will be needed",
        partner: "Probably eight.",
        cue: "Get the end time before you agree to the plan.",
        you: "Until what time do you expect?",
      },
      {
        id: "fab-i-have-a-commitment",
        text: "I have a commitment",
        meaning: "a polite way to say you have a fixed plan",
        partner: "Can you stay Thursday too?",
        cue: "Protect your time without sharing every detail.",
        you: "I have a commitment on Thursday evening.",
      },
      {
        id: "fab-can-someone-cover",
        text: "can someone cover",
        meaning: "ask whether another person can take the task",
        partner: "Who else is trained on it?",
        cue: "Offer a solution along with the limit.",
        you: "Can someone cover Thursday? Priya is trained.",
      },
      {
        id: "fab-ill-make-it-up",
        text: "I'll make it up",
        meaning: "you will give back the time later",
        partner: "Okay, thanks for flexing.",
        cue: "Show goodwill by offering a way to balance it.",
        you: "I'll make it up on Friday if you need me.",
      },
    ],
  }),
  floor({
    id: "fab-incoming",
    title: "Wrong label",
    topic: "Incoming material check",
    scene: "A pallet arrived this morning. One label is not like the others.",
    partner: "Amy, receiving",
    text: `Amy has the box open on the bench. A pen sits behind her ear. She is about to be very right about something.

"{{fab-check-the-label}}," she says. "Lot code, then date."

Maya reads it twice. "It {{fab-doesnt-match}} the purchase order."

"And the {{fab-certificate-missing}}. The paperwork is not in the envelope."

"Then it can't enter the fab. {{fab-quarantine-it}} until we know."

Amy nods. "Who tells the supplier?"

"I'll {{fab-notify-the-supplier}} today, and copy you."`,
    beats: [
      {
        id: "fab-check-the-label",
        text: "check the label",
        meaning: "read the label carefully against the order",
        partner: "Something looks off to me.",
        cue: "Start with the basic check, not with an opinion.",
        you: "Let's check the label against the order.",
      },
      {
        id: "fab-doesnt-match",
        text: "doesn't match",
        meaning: "it is not the same as what was ordered",
        partner: "So what's the problem?",
        cue: "State what is wrong in a few words.",
        you: "The lot code doesn't match the purchase order.",
      },
      {
        id: "fab-certificate-missing",
        text: "the certificate is missing",
        meaning: "the quality paperwork did not arrive with the material",
        partner: "Anything else?",
        cue: "Add the second fact so the problem is complete.",
        you: "And the certificate is missing from the envelope.",
      },
      {
        id: "fab-quarantine-it",
        text: "quarantine it",
        meaning: "keep it separate so nobody uses it",
        partner: "So what do we do with it?",
        cue: "Use a firm, short instruction.",
        you: "Quarantine it until we have an answer.",
      },
      {
        id: "fab-notify-the-supplier",
        text: "notify the supplier",
        meaning: "tell the supplier about the problem",
        partner: "Who tells them?",
        cue: "Take the next step and say who is copied.",
        you: "I'll notify the supplier today and copy you.",
      },
    ],
  }),
  floor({
    id: "fab-qual",
    title: "Back in production",
    topic: "Tool qualification",
    scene: "The tool was repaired this morning. Now it has to prove it deserves lots again.",
    partner: "Ken, equipment engineer",
    text: `Ken wipes his hands and puts the tool back on the schedule. "It's fixed. Probably."

"Probably isn't a status," Maya says. "We need to {{fab-re-qualify}} it."

"Then {{fab-run-a-monitor}} first."

"Right. Compare it with the {{fab-baseline}} from last month."

Ken pulls up the pass table. "What are the {{fab-pass-criteria}}?"

"Thickness within two percent, no new defect types."

The first monitor wafer comes out clean. Ken grins. "So we can get it {{fab-back-in-production}}?"

"After the second wafer."`,
    beats: [
      {
        id: "fab-re-qualify",
        text: "re-qualify",
        meaning: "prove again that the tool is good after a change or repair",
        partner: "It's fixed. Probably.",
        cue: "Say that fixed is not the same as proven.",
        you: "We need to re-qualify it before it runs product.",
      },
      {
        id: "fab-run-a-monitor",
        text: "run a monitor",
        meaning: "process a test wafer to check the tool",
        partner: "What's the first step?",
        cue: "Name the first concrete action.",
        you: "Let's run a monitor wafer first.",
      },
      {
        id: "fab-baseline",
        text: "baseline",
        meaning: "the earlier normal result you compare against",
        partner: "Compared to what?",
        cue: "Point to the reference, not to a feeling.",
        you: "We compare it with last month's baseline.",
      },
      {
        id: "fab-pass-criteria",
        text: "pass criteria",
        meaning: "the rules that decide whether the test passes",
        partner: "What counts as good?",
        cue: "State the rule before you see the result.",
        you: "The pass criteria are thickness within two percent and no new defects.",
      },
      {
        id: "fab-back-in-production",
        text: "back in production",
        meaning: "running real product wafers again",
        partner: "Can it run lots now?",
        cue: "Give a conditional yes, not a rushed one.",
        you: "It can go back in production after the second wafer.",
      },
    ],
  }),
  floor({
    id: "fab-mistake",
    title: "My mistake",
    topic: "Owning an error",
    scene: "The wrong recipe ran on one lot. Maya is the one who selected it.",
    partner: "Dan, shift lead",
    text: `Maya sees it on the screen before anyone else does. The recipe name is off by one letter.

Her stomach drops, then steadies. She walks to Dan's desk.

"{{fab-i-made-a-mistake}}. Lot 5502."

Dan doesn't raise his voice. "Tell me."

"{{fab-heres-what-happened}}: I picked the old recipe, and I did not recheck the name before I started."

"Where is the lot now?"

"{{fab-we-caught-it-in-time}}. It's at the first step. Nothing has moved on."

"Good. What do you need?"

"{{fab-how-can-i-help-fix-it}}? And {{fab-it-wont-happen-again}} — I'm adding a name check to my routine today."`,
    beats: [
      {
        id: "fab-i-made-a-mistake",
        text: "I made a mistake",
        meaning: "you admit the error directly",
        partner: "You wanted to talk?",
        cue: "Say it first, in plain words. Fast honesty is respected.",
        you: "I made a mistake on lot 5502.",
      },
      {
        id: "fab-heres-what-happened",
        text: "here's what happened",
        meaning: "you will explain the events in order",
        partner: "Tell me.",
        cue: "Give the facts. No excuses and no blame.",
        you: "Here's what happened: I picked the old recipe.",
      },
      {
        id: "fab-we-caught-it-in-time",
        text: "we caught it in time",
        meaning: "the problem was found before it spread",
        partner: "Where is the lot now?",
        cue: "Give the good news, if you have it, in a calm tone.",
        you: "We caught it in time. Nothing has moved on.",
      },
      {
        id: "fab-how-can-i-help-fix-it",
        text: "how can I help fix it",
        meaning: "you offer to take part in the repair",
        partner: "So what do you need?",
        cue: "Offer help right away.",
        you: "How can I help fix it?",
      },
      {
        id: "fab-it-wont-happen-again",
        text: "it won't happen again",
        meaning: "you promise to prevent a repeat",
        partner: "What changes?",
        cue: "Pair the promise with a real change.",
        you: "It won't happen again. I'm adding a name check today.",
      },
    ],
  }),
  floor({
    id: "fab-escalate",
    title: "Above your head",
    topic: "Escalating a problem",
    scene: "You have tried everything on your level. Now someone else has to decide.",
    partner: "Grace, operations",
    text: `Maya has been rehearsing this in the elevator.

"Grace, do you have two minutes? {{fab-i-need-to-escalate}} a problem."

Grace puts down her tablet. "Go ahead."

"Lot 6120 failed a second time. We've {{fab-out-of-options}} on our level."

"What's {{fab-the-impact-is}} so far?"

"The impact is a three-day delay on a priority customer."

Grace folds her arms. "What do you want from me?"

"{{fab-i-need-a-decision}} on whether we rework or scrap. And {{fab-by-when}}? The customer expects an update tomorrow."`,
    beats: [
      {
        id: "fab-i-need-to-escalate",
        text: "I need to escalate",
        meaning: "you must tell someone more senior",
        partner: "Do you have a minute?",
        cue: "Open with the purpose. Senior people appreciate clarity.",
        you: "I need to escalate a problem.",
      },
      {
        id: "fab-out-of-options",
        text: "out of options",
        meaning: "nothing else you can try on your own level",
        partner: "What have you tried?",
        cue: "Say you tried first, so it does not sound lazy.",
        you: "We've tried the standard fixes. We're out of options on our level.",
      },
      {
        id: "fab-the-impact-is",
        text: "the impact is",
        meaning: "what changes because of the problem",
        partner: "What does this affect?",
        cue: "Give the business effect in one line.",
        you: "The impact is a three-day delay on a priority customer.",
      },
      {
        id: "fab-i-need-a-decision",
        text: "I need a decision",
        meaning: "you are asking them to choose",
        partner: "What do you want from me?",
        cue: "Ask for one clear choice between options.",
        you: "I need a decision on rework or scrap.",
      },
      {
        id: "fab-by-when",
        text: "by when",
        meaning: "ask for the deadline for the answer",
        partner: "I'll look at it.",
        cue: "Turn a vague promise into a time.",
        you: "Thank you. By when can I expect it?",
      },
    ],
  }),
  floor({
    id: "fab-chat",
    title: "Quick message",
    topic: "Team chat",
    scene: "Three lines. One request. No one reads long messages on the floor.",
    partner: "Priya, process",
    text: `Maya opens the team chat on her tablet.

She keeps it short. "{{fab-quick-question}}: is bay four's recipe the new one?"

Nothing for a minute. She tries again. "{{fab-are-you-around}}?"

The dots appear. Priya: "At the tool. Give me a sec."

"{{fab-no-rush}}," Maya writes, then deletes it. Instead: "{{fab-give-me-five}}? Then I'll call."

Priya sends a thumbs-up and one word: "{{fab-on-it}}."

Later Maya writes back one word of her own: "{{fab-noted}}."`,
    beats: [
      {
        id: "fab-quick-question",
        text: "quick question",
        meaning: "a short, easy way to open a message",
        partner: "",
        cue: "Open short. State the topic in the first line.",
        you: "Quick question: is bay four's recipe the new one?",
      },
      {
        id: "fab-are-you-around",
        text: "are you around",
        meaning: "ask whether they are available right now",
        partner: "",
        cue: "Check if they are free before you send a long message.",
        you: "Are you around?",
      },
      {
        id: "fab-no-rush",
        text: "no rush",
        meaning: "there is no urgency",
        partner: "Give me a sec.",
        cue: "Take the pressure off, in a friendly way.",
        you: "No rush, answer when you can.",
      },
      {
        id: "fab-give-me-five",
        text: "give me five",
        meaning: "I need five minutes",
        partner: "Can you talk now?",
        cue: "Give a short, honest time.",
        you: "Give me five minutes, then I'll call.",
      },
      {
        id: "fab-on-it",
        text: "on it",
        meaning: "you are already working on it",
        partner: "Can you take this one?",
        cue: "Confirm you have it in two words.",
        you: "On it.",
      },
      {
        id: "fab-noted",
        text: "noted",
        meaning: "I saw this, and I understand it",
        partner: "FYI, the recipe changes on Monday.",
        cue: "Acknowledge in one word when nothing else is needed.",
        you: "Noted.",
      },
    ],
  }),
  floor({
    id: "fab-lunch",
    title: "Cafeteria",
    topic: "Small talk at lunch",
    scene: "Twenty minutes where nobody talks about yield.",
    partner: "Jon, yield",
    text: `The cafeteria is loud and smells like soy sauce and floor cleaner. Jon waves Maya over.

"{{fab-how-was-your-weekend}}?"

"Quiet. I went hiking. You?"

"Barely moved. But my kid had a game." Jon smiles. "{{fab-anything-fun}} planned for next weekend?"

"A day trip to the coast."

"{{fab-sounds-like-fun}}. I should do that."

"{{fab-same-here}} — I keep saying I will."

Jon looks at the clock. "{{fab-back-to-it}}?"

"Back to it."`,
    beats: [
      {
        id: "fab-how-was-your-weekend",
        text: "how was your weekend",
        meaning: "a friendly opener on Monday",
        partner: "",
        cue: "Start light. Everyone knows this line.",
        you: "How was your weekend?",
      },
      {
        id: "fab-anything-fun",
        text: "anything fun",
        meaning: "ask if they have plans that sound enjoyable",
        partner: "Barely moved. You?",
        cue: "Keep the question open and easy to answer.",
        you: "Anything fun planned for next weekend?",
      },
      {
        id: "fab-sounds-like-fun",
        text: "sounds like fun",
        meaning: "you react warmly to their plan",
        partner: "A day trip to the coast.",
        cue: "React with warmth in three words.",
        you: "Sounds like fun!",
      },
      {
        id: "fab-same-here",
        text: "same here",
        meaning: "I feel the same, or it is the same for me",
        partner: "I keep saying I'll go.",
        cue: "Show you share the feeling.",
        you: "Same here. I keep saying that too.",
      },
      {
        id: "fab-back-to-it",
        text: "back to it",
        meaning: "time to return to work",
        partner: "Lunch is over.",
        cue: "End the break lightly.",
        you: "Back to it!",
      },
    ],
  }),
  floor({
    id: "fab-review",
    title: "One on one",
    topic: "Talking about your growth",
    scene: "Twice a year, a manager asks where you want to go.",
    partner: "Ethan, manager",
    text: `Ethan has a folder, but he leaves it closed. That is a good sign.

"Tell me how the half went."

"{{fab-im-proud-of}} the audit result. We closed all findings without repeats."

"And where do you want to grow?"

Maya has thought about this. "{{fab-an-area-to-grow}} for me is data analysis. I rely too much on others for the charts."

"What would you like next?"

"{{fab-i-would-like-to-take-on}} the monthly yield report."

"What support do you need?"

"{{fab-could-use-support}} on the statistics side." She smiles. "{{fab-my-goal-is}} to present it myself by spring."`,
    beats: [
      {
        id: "fab-im-proud-of",
        text: "I'm proud of",
        meaning: "you are happy about something you achieved",
        partner: "Tell me how the half went.",
        cue: "Name one real achievement with a result.",
        you: "I'm proud of the audit result. We closed every finding.",
      },
      {
        id: "fab-an-area-to-grow",
        text: "an area to grow",
        meaning: "a skill you want to improve",
        partner: "And where do you want to grow?",
        cue: "Be honest and constructive. Name one skill.",
        you: "An area to grow for me is data analysis.",
      },
      {
        id: "fab-i-would-like-to-take-on",
        text: "I'd like to take on",
        meaning: "you want to accept a bigger responsibility",
        partner: "What would you like next?",
        cue: "Ask for a specific task.",
        you: "I'd like to take on the monthly yield report.",
      },
      {
        id: "fab-could-use-support",
        text: "could use support",
        meaning: "you would benefit from help",
        partner: "What support do you need?",
        cue: "Name the help in one line.",
        you: "I could use support on the statistics side.",
      },
      {
        id: "fab-my-goal-is",
        text: "my goal is",
        meaning: "what you want to achieve",
        partner: "Where do you see this going?",
        cue: "End with a clear target and a time.",
        you: "My goal is to present it myself by spring.",
      },
    ],
  }),
  floor({
    id: "fab-videocall",
    title: "Time zones",
    topic: "Video call with another site",
    scene: "It's late evening here. It's morning there. Everyone is a bit tired and polite.",
    partner: "Tom, overseas engineer",
    text: `The call opens with a long pause and a fuzzy picture.

"{{fab-can-you-hear-me}}?" Maya asks.

Tom's lips move. Nothing comes out. Then: "...muted. Sorry."

"{{fab-youre-on-mute}}," she says gently. A second later his voice arrives, loud and clear.

"Let me {{fab-share-my-screen}}," she says, and the lot report appears for both of them.

Halfway through, Tom's video freezes. "{{fab-you-cut-out}} for a moment. Could you repeat the last part?"

At the end they settle the next call. "{{fab-what-time-works}}?" she asks. "It's nine at night here, so earlier is better."`,
    beats: [
      {
        id: "fab-can-you-hear-me",
        text: "can you hear me",
        meaning: "check that the audio works",
        partner: "",
        cue: "Start every call with the basic check.",
        you: "Can you hear me okay?",
      },
      {
        id: "fab-youre-on-mute",
        text: "you're on mute",
        meaning: "your microphone is switched off",
        partner: "Hello? Hello? Is anyone there?",
        cue: "Say it kindly. It happens to everyone.",
        you: "You're on mute. Just click the microphone.",
      },
      {
        id: "fab-share-my-screen",
        text: "share my screen",
        meaning: "show everyone what is on your display",
        partner: "Can we look at the report?",
        cue: "Tell them what you are about to do.",
        you: "Let me share my screen. Can you see it?",
      },
      {
        id: "fab-you-cut-out",
        text: "you cut out",
        meaning: "the sound or video stopped for a moment",
        partner: "...and then the second lot was...",
        cue: "Say what you missed and ask for a repeat.",
        you: "You cut out for a moment. Could you repeat the last part?",
      },
      {
        id: "fab-what-time-works",
        text: "what time works",
        meaning: "ask for a time that suits them",
        partner: "Let's meet again next week.",
        cue: "Offer your constraint while asking for theirs.",
        you: "What time works for you? It's nine at night here, so earlier is better.",
      },
    ],
  }),
];
