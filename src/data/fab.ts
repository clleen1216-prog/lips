import type { Story } from "./stories";

type Beat = {
  id: string;
  text: string;
  meaning: string;
  partner: string;
  cue: string;
  you: string;
};

export function floor(input: {
  id: string;
  title: string;
  topic: string;
  scene: string;
  partner: string;
  text: string;
  beats: Beat[];
}): Story {
  return {
    id: input.id,
    title: input.title,
    topic: input.topic,
    category: "Fab",
    scene: input.scene,
    minutes: 3,
    partner: input.partner,
    text: input.text,
    phrases: input.beats.map((beat) => ({
      id: beat.id,
      text: beat.text,
      meaning: beat.meaning,
      prompt: beat.cue,
      reply: beat.you,
    })),
    turns: input.beats.map((beat) => ({
      id: beat.id,
      partner: beat.partner,
      cue: beat.cue,
      you: beat.you,
      phraseId: beat.id,
    })),
  };
}

export const fabStories: Story[] = [
  floor({
    id: "fab-intro",
    title: "The new badge",
    topic: "Self intro",
    scene: "First morning with quality. Someone holds the door.",
    partner: "Priya, process",
    text: `Priya catches the door so it doesn't close on a badge that still smells new.

"I don't think we've met. Priya — process."

Maya keeps it to one breath. "{{fab-just-joined}}. {{fab-work-in-quality}}."

"That side stays busy."

"If a lot is {{fab-not-ready-to-ship}}, it comes to me. I'm {{fab-still-new-here}}, though. {{fab-stop-me}} if I get a tool name wrong."`,
    beats: [
      {
        id: "fab-just-joined",
        text: "I just joined",
        meaning: "you started this job very recently",
        partner: "I don't think we've met. I'm Priya, process integration.",
        cue: "Give your name and say you just started. One breath, not your résumé.",
        you: "I'm Maya. I just joined.",
      },
      {
        id: "fab-work-in-quality",
        text: "I work in quality",
        meaning: "your job is quality, said in plain words",
        partner: "Which group are you with?",
        cue: "Name the job without a title soup.",
        you: "I work in quality.",
      },
      {
        id: "fab-not-ready-to-ship",
        text: "not ready to ship",
        meaning: "the lot should not go to the customer yet",
        partner: "What actually lands on your desk?",
        cue: "Say the decision you own. Skip the department name.",
        you: "Lots that are not ready to ship.",
      },
      {
        id: "fab-still-new-here",
        text: "still new here",
        meaning: "you haven't learned the place yet",
        partner: "The line is noisy this month. You'll hear it.",
        cue: "Admit you're new without apologizing for existing.",
        you: "I'm still new here, so plain words help.",
      },
      {
        id: "fab-stop-me",
        text: "stop me",
        meaning: "please interrupt if I get something wrong",
        partner: "I talk fast. Fair warning.",
        cue: "Invite them to correct you. People like being useful.",
        you: "Stop me if I get a tool name wrong.",
      },
    ],
  }),
  floor({
    id: "fab-gown",
    title: "Gowning room",
    topic: "Meeting someone new",
    scene: "The real lobby is where the hoods are.",
    partner: "Jon, yield",
    text: `Jon is already tying a hood. Maya decides pretending would be worse.

"{{fab-have-we-met}}? I'm Maya."

"Jon. Yield. {{fab-what-do-you-work-on}}, besides catching doors?"

"{{fab-im-with-quality}}. If your trend goes the wrong way, I'm the one who asks why."

"Then {{fab-lets-sync}} this week. Bay three has been moody."

"{{fab-ill-find-you}} after the morning board."`,
    beats: [
      {
        id: "fab-have-we-met",
        text: "have we met",
        meaning: "a light way to start when you are not sure",
        partner: "Hey — you new on this shift?",
        cue: "Open without pretending you remember a name.",
        you: "Have we met? I'm Maya.",
      },
      {
        id: "fab-what-do-you-work-on",
        text: "what do you work on",
        meaning: "ask what someone actually does, casually",
        partner: "Jon. Yield. You?",
        cue: "Ask about the work, not the badge title.",
        you: "What do you work on, day to day?",
      },
      {
        id: "fab-im-with-quality",
        text: "I'm with quality",
        meaning: "you belong to the quality group",
        partner: "Mostly the trend on bay three. And you?",
        cue: "Answer in five words. They are tying a hood.",
        you: "I'm with quality.",
      },
      {
        id: "fab-lets-sync",
        text: "let's sync",
        meaning: "let's have a short work conversation soon",
        partner: "Bay three has been moody. We should talk.",
        cue: "Agree to a real follow-up, not a vague someday.",
        you: "Let's sync after the morning board.",
      },
      {
        id: "fab-ill-find-you",
        text: "I'll find you",
        meaning: "you will come look for them, they don't have to chase",
        partner: "I'll be on the floor.",
        cue: "Take the effort of the next step.",
        you: "I'll find you.",
      },
    ],
  }),
  floor({
    id: "fab-handoff",
    title: "Before you go",
    topic: "Shift handover",
    scene: "Night shift is already standing up. The lot is not.",
    partner: "Sam, nights",
    text: `Sam is half out of the chair. The night is still on the screen. Maya doesn't sit.

"{{fab-quick-update}} before you go?"

"Please."

"Lot 441 is {{fab-on-hold}}. The cause is {{fab-not-clear-yet}} — etch, maybe. {{fab-dont-move-it}} until quality signs. I'll {{fab-keep-you-posted}} in the group chat."`,
    beats: [
      {
        id: "fab-quick-update",
        text: "quick update",
        meaning: "a short status, not a meeting",
        partner: "I'm already out the door. Make it fast.",
        cue: "Ask for a minute without trapping them.",
        you: "Quick update before you go?",
      },
      {
        id: "fab-on-hold",
        text: "on hold",
        meaning: "stopped on purpose until someone decides",
        partner: "What do I need to know?",
        cue: "Name the lot's status in two words.",
        you: "Lot 441 is on hold.",
      },
      {
        id: "fab-not-clear-yet",
        text: "not clear yet",
        meaning: "you don't know the cause, and you won't fake it",
        partner: "Etch, or something upstream?",
        cue: "Say you don't know. That is more professional than a guess.",
        you: "The cause is not clear yet.",
      },
      {
        id: "fab-dont-move-it",
        text: "don't move it",
        meaning: "leave the material where it is",
        partner: "Can days run it if the tool is free?",
        cue: "Give a clear instruction. Soft voice, hard meaning.",
        you: "Don't move it until we sign.",
      },
      {
        id: "fab-keep-you-posted",
        text: "keep you posted",
        meaning: "you will send news when you have it",
        partner: "I won't see the chat until tonight.",
        cue: "Promise the update so they can leave.",
        you: "I'll keep you posted.",
      },
    ],
  }),
  floor({
    id: "fab-yield",
    title: "Slide six",
    topic: "In the meeting",
    scene: "The yield review is moving on. You still have the point.",
    partner: "The yield review",
    text: `The review is on slide six. Maya leans toward the table, not over it.

"{{fab-can-i-jump-in}}?"

She doesn't fill the quiet too fast. "{{fab-from-the-quality-side}}, {{fab-the-data-says}} this isn't a one-wafer story. I {{fab-wouldnt-ship}} this lot. We can {{fab-take-that-offline}} and not use the whole hour."`,
    beats: [
      {
        id: "fab-can-i-jump-in",
        text: "can I jump in",
        meaning: "a polite way to interrupt a moving meeting",
        partner: "And that's the excursion. Next slide is the ship plan.",
        cue: "Enter the conversation without apologizing for a full minute.",
        you: "Can I jump in?",
      },
      {
        id: "fab-from-the-quality-side",
        text: "from the quality side",
        meaning: "this is quality's view, not the whole company's",
        partner: "Go ahead.",
        cue: "Mark whose view this is, so it doesn't sound like a personal fight.",
        you: "From the quality side, this isn't one wafer.",
      },
      {
        id: "fab-the-data-says",
        text: "the data says",
        meaning: "you are pointing at evidence, not a feeling",
        partner: "Is that a hunch?",
        cue: "Tie the opinion to the evidence.",
        you: "The data says it started repeating on Tuesday.",
      },
      {
        id: "fab-wouldnt-ship",
        text: "wouldn't ship",
        meaning: "you would not send this to the customer",
        partner: "Can we still make the ship date?",
        cue: "Give the decision. Don't bury it under background.",
        you: "I wouldn't ship this lot.",
      },
      {
        id: "fab-take-that-offline",
        text: "take that offline",
        meaning: "discuss the detail later, with fewer people",
        partner: "We only have ten minutes left.",
        cue: "Park the long debate without dropping it.",
        you: "Let's take that offline.",
      },
    ],
  }),
  floor({
    id: "fab-slides",
    title: "One number",
    topic: "Presenting",
    scene: "Your update. One chart. A room that wants to leave.",
    partner: "The room",
    text: `Maya's slide has one number on it. That was the point.

"{{fab-keep-this-short}}. I'll {{fab-walk-you-through}} the excursion, then {{fab-the-bottom-line}}."

She points once. "{{fab-what-this-means}} is the lot stays held. I'm {{fab-happy-to-take-questions}} at the end — sooner, if I lose you."`,
    beats: [
      {
        id: "fab-keep-this-short",
        text: "keep this short",
        meaning: "you will not talk for a long time",
        partner: "We've got about ten minutes.",
        cue: "Promise brevity before you start. Then keep it.",
        you: "I'll keep this short.",
      },
      {
        id: "fab-walk-you-through",
        text: "walk you through",
        meaning: "explain it step by step, out loud",
        partner: "We haven't seen this lot.",
        cue: "Offer the path through the story, not every chart.",
        you: "Let me walk you through what happened.",
      },
      {
        id: "fab-the-bottom-line",
        text: "the bottom line",
        meaning: "the one conclusion that matters",
        partner: "Skip to what you need from us.",
        cue: "Signal that the conclusion is coming now.",
        you: "The bottom line: the lot stays held.",
      },
      {
        id: "fab-what-this-means",
        text: "what this means",
        meaning: "the practical result, not the raw number",
        partner: "So the chart is red. And?",
        cue: "Translate the number into a decision.",
        you: "What this means is we don't ship it today.",
      },
      {
        id: "fab-happy-to-take-questions",
        text: "happy to take questions",
        meaning: "you are ready for people to challenge you",
        partner: "Still with you. Keep going.",
        cue: "Open the door for questions before someone hijacks the slide.",
        you: "Happy to take questions.",
      },
    ],
  }),
  floor({
    id: "fab-qa",
    title: "The question you don't know",
    topic: "After you present",
    scene: "Someone asks for a number you do not have.",
    partner: "Process manager",
    text: `He doesn't wait for the last slide. "How many wafers, exactly?"

Maya doesn't invent one. "{{fab-fair-question}}. I {{fab-dont-have-that}} in front of me. I'll {{fab-follow-up}} this afternoon."

She tries the plain version before the next chart. "{{fab-put-it-simply}}, the tool drifted and we caught it late. {{fab-does-that-answer}} the worry, even without the count?"`,
    beats: [
      {
        id: "fab-fair-question",
        text: "fair question",
        meaning: "you welcome the question instead of dodging",
        partner: "How many wafers, exactly?",
        cue: "Buy one second. Show you heard them.",
        you: "Fair question.",
      },
      {
        id: "fab-dont-have-that",
        text: "don't have that",
        meaning: "you don't know the figure right now",
        partner: "Even a rough count?",
        cue: "Say you don't have it. Do not guess a number in a quality meeting.",
        you: "I don't have that in front of me.",
      },
      {
        id: "fab-follow-up",
        text: "follow up",
        meaning: "you will come back with the answer later",
        partner: "We need it for the ship call.",
        cue: "Promise a time, not a foggy later.",
        you: "I'll follow up this afternoon.",
      },
      {
        id: "fab-put-it-simply",
        text: "put it simply",
        meaning: "say the same fact with easier words",
        partner: "Some of us don't live in that chart.",
        cue: "Drop the jargon. One sentence a customer could follow.",
        you: "Put it simply, the tool drifted and we caught it late.",
      },
      {
        id: "fab-does-that-answer",
        text: "does that answer",
        meaning: "check if you actually resolved their question",
        partner: "I'm not sure that was my question.",
        cue: "Check before you move on.",
        you: "Does that answer it?",
      },
    ],
  }),
  floor({
    id: "fab-lobby",
    title: "A different badge",
    topic: "Customer visit",
    scene: "Visitors are early. You are the first quality person they see.",
    partner: "Visiting customer",
    text: `Their badges are a different color. Maya meets them before the conference room does.

"{{fab-thanks-for-coming-in}}. I'm Maya. I'll be your {{fab-point-of-contact}} on the quality side."

She doesn't decorate it. "The lot you asked about — {{fab-were-on-it}}. The {{fab-customer-impact}} is those two shipments, nothing past them. I'll send a {{fab-written-update}} today, and we can talk it through now."`,
    beats: [
      {
        id: "fab-thanks-for-coming-in",
        text: "thanks for coming in",
        meaning: "you welcome them to your site",
        partner: "We're a little early. Are you quality?",
        cue: "Welcome them like a host, not a defendant.",
        you: "Thanks for coming in. I'm Maya.",
      },
      {
        id: "fab-point-of-contact",
        text: "point of contact",
        meaning: "the person they should talk to",
        partner: "Who owns this from your side?",
        cue: "Give them one name. Yours.",
        you: "I'll be your point of contact on quality.",
      },
      {
        id: "fab-were-on-it",
        text: "we're on it",
        meaning: "the team is already working on the problem",
        partner: "We flew in because the lot went quiet.",
        cue: "Show action before the history.",
        you: "We're on it.",
      },
      {
        id: "fab-customer-impact",
        text: "customer impact",
        meaning: "what actually changes for them",
        partner: "How bad is this for us?",
        cue: "Answer the blast radius, not the tool log.",
        you: "The customer impact is two shipments. Nothing past them.",
      },
      {
        id: "fab-written-update",
        text: "written update",
        meaning: "a note they can forward, not just this conversation",
        partner: "My boss will ask me tonight.",
        cue: "Offer something they can forward.",
        you: "I'll send a written update today.",
      },
    ],
  }),
  floor({
    id: "fab-interview",
    title: "Across the table",
    topic: "Interview",
    scene: "A quality role. The laptop is only half closed.",
    partner: "Hiring manager",
    text: `The hiring manager closes the laptop halfway. That is kinder than a full interrogation face.

"{{fab-thanks-for-having-me}}," Maya says. "{{fab-a-bit-about-me}}: {{fab-in-my-last-role}} I owned excursions. {{fab-i-care-about}} finding the problem before a customer does."

He asks about a time she was wrong. She doesn't dodge it. "{{fab-great-question}}."`,
    beats: [
      {
        id: "fab-thanks-for-having-me",
        text: "thanks for having me",
        meaning: "thank them for the interview, simply",
        partner: "Thanks for making the time.",
        cue: "Thank them once. Then start.",
        you: "Thanks for having me.",
      },
      {
        id: "fab-a-bit-about-me",
        text: "a bit about me",
        meaning: "a short self introduction is starting",
        partner: "Tell me about yourself. The short version.",
        cue: "Announce a short intro so you don't wander.",
        you: "A bit about me.",
      },
      {
        id: "fab-in-my-last-role",
        text: "in my last role",
        meaning: "what you did in the job before this one",
        partner: "What have you actually owned?",
        cue: "One concrete job, not every company you have seen.",
        you: "In my last role I owned excursions and lot holds.",
      },
      {
        id: "fab-i-care-about",
        text: "I care about",
        meaning: "what matters to you in the work",
        partner: "Why quality, not process?",
        cue: "Say the thing you protect. A customer can be the answer.",
        you: "I care about finding the problem before a customer does.",
      },
      {
        id: "fab-great-question",
        text: "great question",
        meaning: "you need a second, and the question is welcome",
        partner: "Tell me about a time you were wrong.",
        cue: "Don't panic. Mark the question, then tell a real story.",
        you: "That's a great question.",
      },
    ],
  }),
  floor({
    id: "fab-tech",
    title: "Bay four",
    topic: "Talking with a technician",
    scene: "The panel is open. Nobody wants to be the cause.",
    partner: "Rin, technician",
    text: `Rin has the panel open and the look of someone waiting to be blamed. Maya keeps her hands off the tool.

"{{fab-what-did-you-see}}? {{fab-walk-me-through}} it from the first alarm."

"Around two."

"{{fab-when-did-it-start}}? {{fab-leave-the-lot}} where it is. And I {{fab-appreciate-you-flagging}} it — a lot of people wait."`,
    beats: [
      {
        id: "fab-what-did-you-see",
        text: "what did you see",
        meaning: "ask for their observation, not a theory",
        partner: "I stopped the tool. I didn't know who to call.",
        cue: "Ask what they saw. Don't ask whose fault it is.",
        you: "What did you see?",
      },
      {
        id: "fab-walk-me-through",
        text: "walk me through",
        meaning: "tell the story in order",
        partner: "It alarmed. I stopped the lot.",
        cue: "Ask for the order of events.",
        you: "Walk me through it from the first alarm.",
      },
      {
        id: "fab-when-did-it-start",
        text: "when did it start",
        meaning: "the time the problem began",
        partner: "Sometime on nights.",
        cue: "Pin the time. Quality lives on when.",
        you: "When did it start?",
      },
      {
        id: "fab-leave-the-lot",
        text: "leave the lot",
        meaning: "do not move or run that material",
        partner: "Should I clear the chamber?",
        cue: "Protect the evidence and the wafers.",
        you: "Leave the lot where it is.",
      },
      {
        id: "fab-appreciate-you-flagging",
        text: "appreciate you flagging",
        meaning: "thank them for reporting it early",
        partner: "I almost waited for days to see it.",
        cue: "Thank the report. People hide alarms they think will become blame.",
        you: "I appreciate you flagging it.",
      },
    ],
  }),
  floor({
    id: "fab-push",
    title: "Not particles",
    topic: "Pushing back",
    scene: "The room wants a fast root cause. You don't.",
    partner: "Process lead",
    text: `Someone wants to call it particles and move on. Maya waits until they finish the sentence.

"I {{fab-see-it-differently}}. I'm {{fab-not-convinced}} it's particles. Can we {{fab-look-at-the-data}} before we rename it?"

The room gets quieter, not colder. "Let's {{fab-not-jump-to}} a root cause in this meeting. We can {{fab-agree-on-the-next-step}}: one more split, then we talk."`,
    beats: [
      {
        id: "fab-see-it-differently",
        text: "see it differently",
        meaning: "you disagree, without calling them wrong",
        partner: "It's particles. We can close this.",
        cue: "Disagree with the idea, not the person.",
        you: "I see it differently.",
      },
      {
        id: "fab-not-convinced",
        text: "not convinced",
        meaning: "you don't believe that explanation yet",
        partner: "The micrographs look classic.",
        cue: "Hold your doubt in public. That's allowed.",
        you: "I'm not convinced it's particles.",
      },
      {
        id: "fab-look-at-the-data",
        text: "look at the data",
        meaning: "go back to evidence together",
        partner: "What would change your mind?",
        cue: "Move the argument onto the evidence.",
        you: "Can we look at the data before we rename it?",
      },
      {
        id: "fab-not-jump-to",
        text: "not jump to",
        meaning: "don't decide the conclusion too fast",
        partner: "Leadership wants a cause today.",
        cue: "Slow the conclusion down without killing the meeting.",
        you: "Let's not jump to a root cause in this room.",
      },
      {
        id: "fab-agree-on-the-next-step",
        text: "agree on the next step",
        meaning: "leave with one shared action",
        partner: "So what do you want, then?",
        cue: "End on an action, not a winner.",
        you: "Can we agree on the next step? One more split, then we talk.",
      },
    ],
  }),
  floor({
    id: "fab-show",
    title: "The loud hallway",
    topic: "At a conference",
    scene: "A poster session. Nobody is going to introduce you.",
    partner: "Someone from equipment",
    text: `The hallway is loud in a polite way. A stranger reads Maya's badge longer than the poster.

"{{fab-what-brings-you}} here?" she asks.

"Equipment. You?"

"{{fab-semiconductor-quality}}. Yield, holds, the unglamorous middle." She laughs once. "{{fab-lets-connect}}. I'd {{fab-love-to-hear}} how your tools behave in other fabs. {{fab-enjoy-the-show}} if I lose you in the crowd."`,
    beats: [
      {
        id: "fab-what-brings-you",
        text: "what brings you",
        meaning: "why are you at this event",
        partner: "Sorry — is this your poster?",
        cue: "You start. Conferences don't introduce people for you.",
        you: "What brings you here?",
      },
      {
        id: "fab-semiconductor-quality",
        text: "semiconductor quality",
        meaning: "your field, said so a stranger understands",
        partner: "Equipment. You?",
        cue: "Say the field in words a stranger can repeat later.",
        you: "Semiconductor quality. Yield and holds.",
      },
      {
        id: "fab-lets-connect",
        text: "let's connect",
        meaning: "exchange contact and keep talking later",
        partner: "This is interesting. I have to catch a talk.",
        cue: "Don't let a good hallway chat die in the crowd.",
        you: "Let's connect.",
      },
      {
        id: "fab-love-to-hear",
        text: "love to hear",
        meaning: "you want their experience, not just to talk",
        partner: "We see this on a few lines.",
        cue: "Show curiosity. Ask from their side.",
        you: "I'd love to hear how the tools behave in other fabs.",
      },
      {
        id: "fab-enjoy-the-show",
        text: "enjoy the show",
        meaning: "a light goodbye at an industry event",
        partner: "That's my session starting.",
        cue: "Let them go without a clingy ending.",
        you: "Enjoy the show.",
      },
    ],
  }),
  floor({
    id: "fab-supplier",
    title: "The lot number is the hello",
    topic: "Supplier call",
    scene: "Incoming wafers. The same stain, twice.",
    partner: "Supplier quality",
    text: `Maya skips the weather. The lot number is the hello.

"I'm {{fab-calling-about}} Thursday's wafers. {{fab-were-seeing}} the same stain on two lots. {{fab-can-you-confirm}} the batch record?"

She lets the quiet belong to them. "We'll need {{fab-a-containment}} today. {{fab-by-end-of-day}} is enough — what you will ship, and what you will hold."`,
    beats: [
      {
        id: "fab-calling-about",
        text: "calling about",
        meaning: "the reason for the call, up front",
        partner: "Supplier quality. How can I help?",
        cue: "Skip small talk. Name the reason.",
        you: "I'm calling about Thursday's wafers.",
      },
      {
        id: "fab-were-seeing",
        text: "we're seeing",
        meaning: "this is what shows up on your side",
        partner: "We haven't had other complaints.",
        cue: "Describe the symptom. Don't accuse.",
        you: "We're seeing the same stain on two lots.",
      },
      {
        id: "fab-can-you-confirm",
        text: "can you confirm",
        meaning: "please check a fact and tell me",
        partner: "Which batch?",
        cue: "Ask them to verify a record, not to agree with your theory.",
        you: "Can you confirm the batch record?",
      },
      {
        id: "fab-a-containment",
        text: "a containment",
        meaning: "stop the bad material from moving further",
        partner: "What do you need from us today?",
        cue: "Name the action. Containment is the word this job uses.",
        you: "We need a containment today.",
      },
      {
        id: "fab-by-end-of-day",
        text: "by end of day",
        meaning: "before this workday finishes",
        partner: "Today is tight.",
        cue: "Give a clock time they can plan around.",
        you: "By end of day is enough.",
      },
    ],
  }),
  floor({
    id: "fab-standup",
    title: "Still standing",
    topic: "Morning standup",
    scene: "The board is short on purpose. Your turn is shorter.",
    partner: "The standup",
    text: `Everyone stays on their feet, which keeps the board honest. Maya waits for the nod.

"{{fab-one-thing-to-flag}}: the etch excursion is still open. I'm {{fab-blocked-on}} the tool log from nights."

Someone starts to assign it sideways. "{{fab-i-can-take-that}}. {{fab-nothing-else}} from quality. {{fab-thats-all-from-me}}."`,
    beats: [
      {
        id: "fab-one-thing-to-flag",
        text: "one thing to flag",
        meaning: "one issue the group should hear",
        partner: "Quality?",
        cue: "Signal there is exactly one item. People relax.",
        you: "One thing to flag: the etch excursion is still open.",
      },
      {
        id: "fab-blocked-on",
        text: "blocked on",
        meaning: "you cannot move until something else arrives",
        partner: "Why isn't it closed?",
        cue: "Name the blocker, not your frustration.",
        you: "I'm blocked on the tool log from nights.",
      },
      {
        id: "fab-i-can-take-that",
        text: "I can take that",
        meaning: "you volunteer to own the task",
        partner: "Who's chasing the log?",
        cue: "Take it before it becomes a cloud of names.",
        you: "I can take that.",
      },
      {
        id: "fab-nothing-else",
        text: "nothing else",
        meaning: "you have no more topics",
        partner: "Anything else we should worry about?",
        cue: "Don't invent a second topic to sound busy.",
        you: "Nothing else from quality.",
      },
      {
        id: "fab-thats-all-from-me",
        text: "that's all from me",
        meaning: "you are done speaking",
        partner: "Thanks. Process, you're up.",
        cue: "Hand the meeting back.",
        you: "That's all from me.",
      },
    ],
  }),
  floor({
    id: "fab-manager",
    title: "Walk with me",
    topic: "With your manager",
    scene: "A concern about a thin sample, before it becomes a surprise.",
    partner: "Your manager",
    text: `Maya knocks on the open frame. "{{fab-got-a-minute}}?"

"Walk with me."

"I {{fab-wanted-to-run-this-by-you}}. {{fab-im-concerned}} we're releasing on a thin sample. {{fab-what-do-you-think}} — hold one more day?"

He asks who writes the note. "{{fab-ill-own-it}}. You'll have it before lunch."`,
    beats: [
      {
        id: "fab-got-a-minute",
        text: "got a minute",
        meaning: "ask if they can talk briefly right now",
        partner: "Heading to the floor. Walk with me?",
        cue: "Ask for time before you unload the problem.",
        you: "Got a minute?",
      },
      {
        id: "fab-wanted-to-run-this-by-you",
        text: "wanted to run this by you",
        meaning: "you want their view before you act",
        partner: "Walk with me. What's up?",
        cue: "Frame it as a check-in, not a complaint dump.",
        you: "I wanted to run this by you.",
      },
      {
        id: "fab-im-concerned",
        text: "I'm concerned",
        meaning: "you are worried, said calmly",
        partner: "About the ship?",
        cue: "Name the worry in one line. Calm is the professional version of urgent.",
        you: "I'm concerned we're releasing on a thin sample.",
      },
      {
        id: "fab-what-do-you-think",
        text: "what do you think",
        meaning: "ask for their judgment",
        partner: "Sounds like you already have a lean.",
        cue: "Ask anyway. Managers notice when you pretend you don't need them.",
        you: "What do you think — hold one more day?",
      },
      {
        id: "fab-ill-own-it",
        text: "I'll own it",
        meaning: "you will do the next action yourself",
        partner: "Who's writing the note?",
        cue: "Take the next step so the concern doesn't bounce back.",
        you: "I'll own it. You'll have the note before lunch.",
      },
    ],
  }),
];
