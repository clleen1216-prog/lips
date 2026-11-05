import { fabStories } from "@/data/fab";
import { moreFabStories } from "@/data/fab-more";
import { fabStoriesTwo } from "@/data/fab-more2";
import { moreLifeStories } from "@/data/more-life";
import { levelOf } from "@/data/levels";

export type Category = "Out" | "Friends" | "Work" | "Home" | "Plans" | "Travel" | "Fab";

export type Phrase = {
  id: string;
  text: string;
  meaning: string;
  prompt: string;
  reply: string;
};

export type Turn = {
  id: string;
  partner: string;
  cue: string;
  you: string;
  phraseId: string;
};

export type Story = {
  id: string;
  title: string;
  topic: string;
  category: Category;
  scene: string;
  minutes: number;
  text: string;
  phrases: Phrase[];
  partner?: string;
  turns?: Turn[];
};

export const categories: Category[] = ["Fab", "Work", "Friends", "Plans", "Out", "Home", "Travel"];

const lifeStories: Story[] = [
  {
    id: "late",
    title: "The 8:12",
    topic: "Running late",
    category: "Out",
    scene: "A bus that will not hurry, and a meeting that already started.",
    minutes: 2,
    text: `Maya watches the doors shut on the bus she needed. She is {{running-late}} again.

Her thumb is already moving. "{{on-my-way}}. I'm {{stuck-in-traffic}}, so start without the good chairs."

Three dots. Then a reply: "{{hang-on}}. We'll do the easy part first."

She smiles at her own reflection in the window. "{{ill-be-right-there}}. Save me the seat by the door."`,
    phrases: [
      {
        id: "running-late",
        text: "running late",
        meaning: "not going to arrive on time",
        prompt: "The meeting has started and you are still on the bus. You text:",
        reply: "Sorry, I'm running late. Start without me.",
      },
      {
        id: "on-my-way",
        text: "on my way",
        meaning: "I have left, and I am coming now",
        prompt: "You have left home. Someone asks if you are still there. You say:",
        reply: "I'm on my way.",
      },
      {
        id: "stuck-in-traffic",
        text: "stuck in traffic",
        meaning: "the cars are not moving, so you are delayed",
        prompt: "Nothing on the road is moving. You explain the delay:",
        reply: "I'm stuck in traffic.",
      },
      {
        id: "hang-on",
        text: "hang on",
        meaning: "wait a moment",
        prompt: "Someone asks a quick question and you need a second. You say:",
        reply: "Hang on — let me check.",
      },
      {
        id: "ill-be-right-there",
        text: "I'll be right there",
        meaning: "I will arrive very soon",
        prompt: "You are close, and they should expect you any minute. You say:",
        reply: "I'll be right there.",
      },
    ],
  },
  {
    id: "coffee",
    title: "Corner table",
    topic: "Catching up",
    category: "Friends",
    scene: "Two people, one table, and months of news.",
    minutes: 2,
    text: `Sam drops into the chair like no time has passed. "{{long-time-no-see}}."

"{{hows-it-going}}" Maya asks, sliding a menu across.

"Busy. That's why I wanted to {{catch-up}}. Not a big dinner. Just {{grab-a-coffee}} and the headlines of our lives."

Maya taps the cup she already ordered. "And the new job?"

"{{so-far-so-good}}. Ask me again on Friday."`,
    phrases: [
      {
        id: "long-time-no-see",
        text: "long time no see",
        meaning: "we have not seen each other in a long time",
        prompt: "You meet a friend after many months. You open with:",
        reply: "Long time no see!",
      },
      {
        id: "hows-it-going",
        text: "how's it going?",
        meaning: "a casual way to ask how someone is",
        prompt: "You want a relaxed hello, not a formal one. You ask:",
        reply: "How's it going?",
      },
      {
        id: "catch-up",
        text: "catch up",
        meaning: "share news after time apart",
        prompt: "You want to hear someone's news after a long gap. You suggest you:",
        reply: "Let's catch up this week.",
      },
      {
        id: "grab-a-coffee",
        text: "grab a coffee",
        meaning: "get a coffee together, usually quickly",
        prompt: "You want a short, easy meetup, not a long dinner. You say:",
        reply: "Want to grab a coffee?",
      },
      {
        id: "so-far-so-good",
        text: "so far so good",
        meaning: "things are fine up to now",
        prompt: "Someone asks how the new job is. It is okay so far. You say:",
        reply: "So far so good.",
      },
    ],
  },
  {
    id: "saturday",
    title: "The thread",
    topic: "Making plans",
    category: "Plans",
    scene: "A group chat trying to become a Saturday.",
    minutes: 2,
    text: `The group chat has been busy since noon. That is how Saturdays become real.

"Picnic, if the sky stays kind. {{im-in}}," Lena writes.

Jon is faster than the weather. "{{count-me-in}}. What are we eating?"

"{{up-to-you}}." Lena drops a pin. "Park at four {{works-for-me}}."

Maya looks at a calendar square that is already full. "I need a {{rain-check}}. Family thing. Next clear Saturday, I'm there."`,
    phrases: [
      {
        id: "im-in",
        text: "I'm in",
        meaning: "I want to join",
        prompt: "Friends are planning a picnic and you want to come. You write:",
        reply: "I'm in.",
      },
      {
        id: "count-me-in",
        text: "count me in",
        meaning: "include me — I am coming",
        prompt: "You want your name on the list. You say:",
        reply: "Count me in.",
      },
      {
        id: "up-to-you",
        text: "up to you",
        meaning: "you can decide",
        prompt: "Either plan is fine. You want them to choose. You say:",
        reply: "It's up to you.",
      },
      {
        id: "works-for-me",
        text: "works for me",
        meaning: "that time or plan is fine for me",
        prompt: "They suggested four o'clock, and you can do it. You say:",
        reply: "Four works for me.",
      },
      {
        id: "rain-check",
        text: "rain check",
        meaning: "let's do it later, not today",
        prompt: "You can't join today, but you still want to, another day. You say:",
        reply: "Can I take a rain check?",
      },
    ],
  },
  {
    id: "favor",
    title: "Sugar and a key",
    topic: "A small favor",
    category: "Home",
    scene: "A neighbor, a spare key, and a cake that needs a counter.",
    minutes: 2,
    text: `The cake is in the oven. The spare key is not. Maya knocks with a mixing bowl on her hip.

"{{do-you-mind}} if this sits on your counter? I locked the good pan inside."

Mr. Adeyemi waves her in. "{{no-worries}}. {{whenever-youre-ready}} — I'm home all afternoon."

She sets the bowl down carefully. "{{appreciate-it}}. Seriously. {{i-owe-you-one}}."`,
    phrases: [
      {
        id: "do-you-mind",
        text: "do you mind",
        meaning: "a polite way to ask if a small request is okay",
        prompt: "You need a small favor and want to ask politely. You start with:",
        reply: "Do you mind if I leave this here?",
      },
      {
        id: "no-worries",
        text: "no worries",
        meaning: "it's fine — don't feel bad about it",
        prompt: "Someone thanks you and feels bad for the trouble. You answer:",
        reply: "No worries.",
      },
      {
        id: "whenever-youre-ready",
        text: "whenever you're ready",
        meaning: "there is no hurry",
        prompt: "They can start whenever they want. You say:",
        reply: "Whenever you're ready.",
      },
      {
        id: "appreciate-it",
        text: "appreciate it",
        meaning: "thank you — I notice the help",
        prompt: "You want a warm, simple thank-you. You say:",
        reply: "I appreciate it.",
      },
      {
        id: "i-owe-you-one",
        text: "I owe you one",
        meaning: "you helped me, and I will help you next time",
        prompt: "A neighbor just saved your afternoon. You tell them:",
        reply: "I owe you one.",
      },
    ],
  },
  {
    id: "cancel",
    title: "Not tonight",
    topic: "Cancelling",
    category: "Plans",
    scene: "A dinner you have to leave before it starts.",
    minutes: 2,
    text: `Maya types the message, deletes it, and types it again.

"Hey. {{something-came-up}} with my sister. {{i-cant-make-it}} tonight."

She adds the line she would rather skip. "{{my-bad}}. I should have said this morning."

The reply is kinder than she braced for. "Go be with her. {{keep-me-posted}} — and we'll do {{another-time}}."`,
    phrases: [
      {
        id: "something-came-up",
        text: "something came up",
        meaning: "an unexpected thing now needs your time",
        prompt: "A surprise problem means you have to change the plan. You explain:",
        reply: "Something came up with my sister.",
      },
      {
        id: "i-cant-make-it",
        text: "I can't make it",
        meaning: "I won't be able to come",
        prompt: "You will not be at dinner. You say it plainly:",
        reply: "I can't make it tonight.",
      },
      {
        id: "my-bad",
        text: "my bad",
        meaning: "that was my mistake",
        prompt: "You want to admit a small mistake, casually. You say:",
        reply: "My bad — I should have told you sooner.",
      },
      {
        id: "keep-me-posted",
        text: "keep me posted",
        meaning: "tell me if anything changes",
        prompt: "You want news if the plan shifts. You say:",
        reply: "Keep me posted.",
      },
      {
        id: "another-time",
        text: "another time",
        meaning: "on a different day, not this one",
        prompt: "Tonight is off, but you still want to meet later. You say:",
        reply: "Let's do it another time.",
      },
    ],
  },
  {
    id: "meeting",
    title: "After four",
    topic: "At work",
    category: "Work",
    scene: "A meeting that forgot how clocks work.",
    minutes: 2,
    text: `The calendar said one hour. Nobody told the meeting.

Maya sends a note to the person waiting outside. "{{heads-up}}: we're {{running-behind}}."

Then she looks around the table. "Just so we're {{on-the-same-page}} — the budget stays, the date moves. We can {{circle-back}} tomorrow."

Someone's stomach answers for the room. She closes the laptop. "Let's {{call-it-a-day}}."`,
    phrases: [
      {
        id: "heads-up",
        text: "heads up",
        meaning: "a short warning before something happens",
        prompt: "You want to warn someone before a delay hits them. You start with:",
        reply: "Heads up — we're running behind.",
      },
      {
        id: "running-behind",
        text: "running behind",
        meaning: "later than the schedule",
        prompt: "The meeting ran long. You tell the next person:",
        reply: "We're running behind.",
      },
      {
        id: "on-the-same-page",
        text: "on the same page",
        meaning: "we understand the plan the same way",
        prompt: "You want to check that everyone shares the same plan. You say:",
        reply: "Just so we're on the same page…",
      },
      {
        id: "circle-back",
        text: "circle back",
        meaning: "talk about this again later",
        prompt: "This topic can wait until tomorrow. You say:",
        reply: "Let's circle back tomorrow.",
      },
      {
        id: "call-it-a-day",
        text: "call it a day",
        meaning: "stop work for today",
        prompt: "Everyone is tired and the useful part is over. You say:",
        reply: "Let's call it a day.",
      },
    ],
  },
  {
    id: "check",
    title: "One bill, four forks",
    topic: "The bill",
    category: "Friends",
    scene: "Too much bread, and the small question of who pays.",
    minutes: 2,
    text: `The bread is gone. So is the plan to eat light.

"{{im-starving}} was an hour ago," Jon says. "Now I just want to {{grab-a-bite}} of that cake and lie down."

The server sets the bill in the middle, like a small dare.

"{{on-me}}," Lena says, already reaching.

"No," Maya says. "{{lets-split-it}}. You got the last one."

Jon eyes the last fry. Maya slides the plate over. "{{im-good}}. Those are yours."`,
    phrases: [
      {
        id: "im-starving",
        text: "I'm starving",
        meaning: "I am very hungry",
        prompt: "You are extremely hungry, talking with friends. You say:",
        reply: "I'm starving.",
      },
      {
        id: "grab-a-bite",
        text: "grab a bite",
        meaning: "eat something small or quick",
        prompt: "You want a casual snack, not a big dinner. You suggest you:",
        reply: "Let's grab a bite.",
      },
      {
        id: "on-me",
        text: "on me",
        meaning: "I will pay",
        prompt: "You want to pay for the table. You say:",
        reply: "This one's on me.",
      },
      {
        id: "lets-split-it",
        text: "let's split it",
        meaning: "we each pay our share",
        prompt: "You don't want one person stuck with the bill. You say:",
        reply: "Let's split it.",
      },
      {
        id: "im-good",
        text: "I'm good",
        meaning: "no thanks — I don't want any more",
        prompt: "They offer you the last fry, and you don't want it. You say:",
        reply: "I'm good. Those are yours.",
      },
    ],
  },
  {
    id: "lost",
    title: "One stop early",
    topic: "Asking the way",
    category: "Out",
    scene: "The doors open. The street is not the right one.",
    minutes: 2,
    text: `The doors open onto a street Maya does not know. She steps off anyway.

"{{excuse-me}}," she says to a man with too many groceries. "I'm {{a-bit-lost}}. {{which-way}} is the river tram?"

He points with his chin. "Two lights, then left. Follow the noise."

"Thank you."

"{{no-problem}}." He is already walking when he adds, easy and warm, "{{take-care}}."`,
    phrases: [
      {
        id: "excuse-me",
        text: "excuse me",
        meaning: "a polite way to start talking to a stranger",
        prompt: "You need help from someone you don't know. You begin with:",
        reply: "Excuse me — could I ask you something?",
      },
      {
        id: "a-bit-lost",
        text: "a bit lost",
        meaning: "not sure where you are",
        prompt: "The street is unfamiliar. You admit:",
        reply: "I'm a bit lost.",
      },
      {
        id: "which-way",
        text: "which way",
        meaning: "asking for the direction",
        prompt: "You need the direction to the tram. You ask:",
        reply: "Which way is the tram?",
      },
      {
        id: "no-problem",
        text: "no problem",
        meaning: "happy to help — it was easy",
        prompt: "Someone thanks you for a simple favor. You answer:",
        reply: "No problem.",
      },
      {
        id: "take-care",
        text: "take care",
        meaning: "a warm way to say goodbye",
        prompt: "You are ending a friendly conversation. You say:",
        reply: "Take care.",
      },
    ],
  },
  {
    id: "text",
    title: "Read it again",
    topic: "Clearing the air",
    category: "Friends",
    scene: "A late text that sounded colder than it felt.",
    minutes: 2,
    text: `At midnight the message looked sharp. In the morning it just looks tired.

Maya calls, which is braver than typing. "{{i-didnt-mean-it-like-that}}. {{the-thing-is}}, I was worried, not angry."

She lets the quiet sit. "Do {{you-know-what-i-mean}}? It came out colder than I felt."

On the other end, a small laugh. "{{no-big-deal}}. {{were-good}}."`,
    phrases: [
      {
        id: "i-didnt-mean-it-like-that",
        text: "I didn't mean it like that",
        meaning: "my words sounded worse than I felt",
        prompt: "Your message came out harsher than you meant. You explain:",
        reply: "I didn't mean it like that.",
      },
      {
        id: "the-thing-is",
        text: "the thing is",
        meaning: "here is the real point",
        prompt: "You want to say what you actually felt. You start with:",
        reply: "The thing is, I was worried, not angry.",
      },
      {
        id: "you-know-what-i-mean",
        text: "you know what I mean",
        meaning: "do you understand what I'm getting at?",
        prompt: "You hope they understood the feeling, not just the words. You ask:",
        reply: "You know what I mean?",
      },
      {
        id: "no-big-deal",
        text: "no big deal",
        meaning: "it is not serious",
        prompt: "The mistake is small and you want them to relax. You say:",
        reply: "It's no big deal.",
      },
      {
        id: "were-good",
        text: "we're good",
        meaning: "the problem between us is over",
        prompt: "A small fight is finished and the friendship is fine. You say:",
        reply: "We're good.",
      },
    ],
  },
  {
    id: "desk",
    title: "First Monday",
    topic: "A new job",
    category: "Work",
    scene: "A badge that still sticks, and a kitchen you have not found.",
    minutes: 2,
    text: `The badge is new. It still sticks to Maya's shirt when she wishes it wouldn't.

"{{nice-to-meet-you}}," she tells the woman at the next desk. "I'm still {{getting-the-hang-of-it}} — {{bear-with-me}} if I ask where the mugs are twice."

The woman laughs the way people do on Mondays. "{{let-me-know}} when you want the real tour. The kitchen is the only important room."

Maya nods, grateful and slightly lost. "{{sounds-good}}."`,
    phrases: [
      {
        id: "nice-to-meet-you",
        text: "nice to meet you",
        meaning: "a hello when you meet someone for the first time",
        prompt: "You are introduced to a new coworker. You say:",
        reply: "Nice to meet you.",
      },
      {
        id: "getting-the-hang-of-it",
        text: "getting the hang of it",
        meaning: "slowly learning how to do something",
        prompt: "The new job is getting clearer, but you are not fluent in it yet. You say:",
        reply: "I'm still getting the hang of it.",
      },
      {
        id: "bear-with-me",
        text: "bear with me",
        meaning: "please be patient with me",
        prompt: "You need people to be patient while you learn. You say:",
        reply: "Bear with me.",
      },
      {
        id: "let-me-know",
        text: "let me know",
        meaning: "tell me later",
        prompt: "You want them to tell you when they are ready. You say:",
        reply: "Let me know when you want the tour.",
      },
      {
        id: "sounds-good",
        text: "sounds good",
        meaning: "I agree with that plan",
        prompt: "Someone suggests a plan you like. You say:",
        reply: "Sounds good.",
      },
    ],
  },
  {
    id: "rain",
    title: "Wet shoes",
    topic: "A long day",
    category: "Home",
    scene: "The walk home is longer when the day was, too.",
    minutes: 2,
    text: `The walk from the station is longer in wet shoes. Maya drops her keys, picks them up, and tells the hall the truth. "{{im-beat}}."

A voice note from her sister is waiting. "{{hang-in-there}}. Bad weeks do end."

Maya records one back, quieter than the rain. "{{could-be-worse}}. I'm going to {{take-it-easy}}, and then I'll {{call-it-a-night}}."`,
    phrases: [
      {
        id: "im-beat",
        text: "I'm beat",
        meaning: "I am very tired",
        prompt: "You get home exhausted. You say:",
        reply: "I'm beat.",
      },
      {
        id: "hang-in-there",
        text: "hang in there",
        meaning: "keep going — this hard part will pass",
        prompt: "A friend is having a rough week. You encourage them:",
        reply: "Hang in there.",
      },
      {
        id: "could-be-worse",
        text: "could be worse",
        meaning: "it is not great, but it is not the worst",
        prompt: "The day was hard, and you want to stay light about it. You say:",
        reply: "Could be worse.",
      },
      {
        id: "take-it-easy",
        text: "take it easy",
        meaning: "rest, and don't push",
        prompt: "You are choosing rest over one more task. You say:",
        reply: "I'm going to take it easy.",
      },
      {
        id: "call-it-a-night",
        text: "call it a night",
        meaning: "stop for the evening",
        prompt: "The evening is done and you want sleep. You say:",
        reply: "Let's call it a night.",
      },
    ],
  },
  {
    id: "boxes",
    title: "Third floor",
    topic: "Helping out",
    category: "Home",
    scene: "A staircase, a friend, and a box with opinions.",
    minutes: 2,
    text: `The stairwell echoes. The box does not get any lighter.

"{{give-me-a-hand}}?" Jon asks, already the color of the brick.

"{{i-got-you}}." Maya takes the other corner. "{{no-rush}}. This one {{weighs-a-ton}}."

They stop on the landing, laughing more than breathing. "We're {{almost-there}}. One more flight, and we never speak of this."`,
    phrases: [
      {
        id: "give-me-a-hand",
        text: "give me a hand",
        meaning: "please help me",
        prompt: "A box is too heavy to carry alone. You ask:",
        reply: "Can you give me a hand?",
      },
      {
        id: "i-got-you",
        text: "I got you",
        meaning: "I will help — you can count on me",
        prompt: "A friend needs you, and you want them to relax. You say:",
        reply: "I got you.",
      },
      {
        id: "no-rush",
        text: "no rush",
        meaning: "take your time",
        prompt: "Someone is hurrying and they don't need to. You say:",
        reply: "No rush.",
      },
      {
        id: "weighs-a-ton",
        text: "weighs a ton",
        meaning: "it is very heavy",
        prompt: "You lift something ridiculously heavy. You say it:",
        reply: "This weighs a ton.",
      },
      {
        id: "almost-there",
        text: "almost there",
        meaning: "nearly finished, or nearly arrived",
        prompt: "One last flight of stairs and you are done. You say:",
        reply: "We're almost there.",
      },
    ],
  },
  {
    id: "soft-no",
    title: "A soft no",
    topic: "Saying no",
    category: "Plans",
    scene: "A kind invite, and a week that cannot hold it.",
    minutes: 2,
    text: `The invite is kind. The week is not. Maya reads it twice so the no does not come out sharp.

"{{i-dont-think-i-can}}. {{maybe-next-time}} — and I mean that."

She adds one more line, so it still sounds like a person. "{{no-pressure}} on the group gift. It's {{all-good}} if you choose without me. {{your-call}}."`,
    phrases: [
      {
        id: "i-dont-think-i-can",
        text: "I don't think I can",
        meaning: "a gentle way to say no",
        prompt: "You need to decline without sounding cold. You say:",
        reply: "I don't think I can.",
      },
      {
        id: "maybe-next-time",
        text: "maybe next time",
        meaning: "not now — perhaps another day",
        prompt: "You can't join, and you want to leave the door open. You say:",
        reply: "Maybe next time.",
      },
      {
        id: "no-pressure",
        text: "no pressure",
        meaning: "you don't have to do it",
        prompt: "You don't want them to feel forced. You add:",
        reply: "No pressure.",
      },
      {
        id: "all-good",
        text: "all good",
        meaning: "everything is fine — no hard feelings",
        prompt: "You want them to know there are no hard feelings. You say:",
        reply: "It's all good.",
      },
      {
        id: "your-call",
        text: "your call",
        meaning: "you decide",
        prompt: "You are happy with whatever they pick. You say:",
        reply: "Your call.",
      },
    ],
  },
  {
    id: "gate",
    title: "Gate B12",
    topic: "A delay",
    category: "Travel",
    scene: "The board changes while the coffee is still too hot.",
    minutes: 2,
    text: `The board changes while Maya is still in the coffee line. Of course it does.

She calls her brother, cup too hot in her hand. "{{looks-like}} we're {{up-in-the-air}}. They won't say delay, and they won't say go."

"{{hang-tight}}," he says.

"I will. I'll {{keep-you-posted}}. {{fingers-crossed}} this is just the weather showing off."`,
    phrases: [
      {
        id: "looks-like",
        text: "looks like",
        meaning: "it seems that",
        prompt: "You are guessing from the board, not from an announcement. You say:",
        reply: "Looks like we're delayed.",
      },
      {
        id: "up-in-the-air",
        text: "up in the air",
        meaning: "not decided yet",
        prompt: "Nobody knows if the flight will leave. You say it is:",
        reply: "It's still up in the air.",
      },
      {
        id: "hang-tight",
        text: "hang tight",
        meaning: "wait a little, and stay calm",
        prompt: "Someone is anxious and the news isn't in yet. You tell them:",
        reply: "Hang tight.",
      },
      {
        id: "keep-you-posted",
        text: "keep you posted",
        meaning: "I will tell you when I know more",
        prompt: "You don't have the answer yet, but you will share it. You say:",
        reply: "I'll keep you posted.",
      },
      {
        id: "fingers-crossed",
        text: "fingers crossed",
        meaning: "I hope this works out",
        prompt: "You are hoping the delay is short. You say:",
        reply: "Fingers crossed.",
      },
    ],
  },
  {
    id: "sick",
    title: "Under the weather",
    topic: "Feeling sick",
    category: "Home",
    scene: "Morning light, and a voice that is not ready for work.",
    minutes: 2,
    text: `The light is rude. Maya's voice is not ready for it. She texts her manager before she can talk herself into bravery.

"I'm {{under-the-weather}}. I'm going to {{call-in}} and {{take-the-day-off}}."

The reply is short, which is its own kindness. "{{dont-push-it}}. {{feel-better}}."`,
    phrases: [
      {
        id: "under-the-weather",
        text: "under the weather",
        meaning: "a little sick",
        prompt: "You feel ill, but not dramatically. You say you are:",
        reply: "I'm under the weather.",
      },
      {
        id: "call-in",
        text: "call in",
        meaning: "phone work to say you cannot come",
        prompt: "You need to tell work you will not be there. You say you will:",
        reply: "I'm going to call in.",
      },
      {
        id: "take-the-day-off",
        text: "take the day off",
        meaning: "not work today, and rest instead",
        prompt: "You are choosing rest over the office. You say you will:",
        reply: "I'll take the day off.",
      },
      {
        id: "dont-push-it",
        text: "don't push it",
        meaning: "don't force yourself",
        prompt: "A sick friend is trying to work anyway. You tell them:",
        reply: "Don't push it.",
      },
      {
        id: "feel-better",
        text: "feel better",
        meaning: "I hope you get well",
        prompt: "You are talking to someone who is sick. You say:",
        reply: "Feel better.",
      },
    ],
  },
  {
    id: "bye",
    title: "The yellow line",
    topic: "Goodbye",
    category: "Travel",
    scene: "The train is here. The goodbye is not finished.",
    minutes: 2,
    text: `The train is already in the station. The goodbye is not finished. Maya's rarely are.

"{{gotta-run}} — this one is mine," she says, walking backward.

Sam lifts a hand. "{{catch-you-later}}."

"{{talk-soon}}. Thursday?"

"Thursday. {{see-you-then}}."

She steps in as the doors begin to complain, and says the last bit to herself. Time to {{hit-the-road}}.`,
    phrases: [
      {
        id: "gotta-run",
        text: "gotta run",
        meaning: "I have to leave right now",
        prompt: "Your train is here and the conversation isn't done. You say:",
        reply: "Gotta run.",
      },
      {
        id: "catch-you-later",
        text: "catch you later",
        meaning: "see you later, said casually",
        prompt: "You want a casual goodbye, not a formal one. You say:",
        reply: "Catch you later.",
      },
      {
        id: "talk-soon",
        text: "talk soon",
        meaning: "we will speak again before long",
        prompt: "You expect another conversation soon, with no exact hour. You say:",
        reply: "Talk soon.",
      },
      {
        id: "see-you-then",
        text: "see you then",
        meaning: "we will meet at the time we agreed",
        prompt: "You just agreed on Thursday. You confirm:",
        reply: "See you then.",
      },
      {
        id: "hit-the-road",
        text: "hit the road",
        meaning: "leave, or start the trip",
        prompt: "It is time to go. You say:",
        reply: "Time to hit the road.",
      },
    ],
  },
  {
    id: "win",
    title: "After the demo",
    topic: "Good news",
    category: "Work",
    scene: "The call ends. The room forgets how to be serious.",
    minutes: 2,
    text: `The call ends. For a second the room is only Maya's chair.

"{{not-gonna-lie}}," she says, "I thought that would fall apart."

Her teammate spins once, badly, on purpose. "{{it-went-well}}. {{for-real}}"

"You said the client would like it."

"{{told-you}}." He points at the door as if it owes them something. "Come on. {{drinks-on-me}}."`,
    phrases: [
      {
        id: "not-gonna-lie",
        text: "not gonna lie",
        meaning: "I'll be honest with you",
        prompt: "You want to admit a feeling straight. You start with:",
        reply: "Not gonna lie, I was nervous.",
      },
      {
        id: "it-went-well",
        text: "it went well",
        meaning: "it was a success",
        prompt: "The demo worked. You report:",
        reply: "It went well.",
      },
      {
        id: "for-real",
        text: "for real?",
        meaning: "seriously? I can hardly believe it",
        prompt: "The good news surprises you. You ask:",
        reply: "For real?",
      },
      {
        id: "told-you",
        text: "told you",
        meaning: "I said this would happen",
        prompt: "You predicted the win, and you cannot resist. You say:",
        reply: "Told you.",
      },
      {
        id: "drinks-on-me",
        text: "drinks on me",
        meaning: "I will pay for the drinks",
        prompt: "You want to celebrate, and you will pay. You say:",
        reply: "Drinks on me.",
      },
    ],
  },
  {
    id: "ear",
    title: "No real plan",
    topic: "Loose plans",
    category: "Plans",
    scene: "An awning, a sky that will not choose, and two people who can wait.",
    minutes: 2,
    text: `They stand under the awning and watch the sky refuse to pick a side.

"Park, or a film?" Jon asks.

"{{it-depends}} on the next ten minutes. {{well-see}}."

"And if it pours and the film is full?"

"{{either-way}}, I'm happy to walk and talk. {{ill-let-you-know}} when I can actually see the street."

He nods, already less worried. "So we {{play-it-by-ear}}."

"That's the whole plan," Maya says. "Try to look impressed."`,
    phrases: [
      {
        id: "it-depends",
        text: "it depends",
        meaning: "the answer changes with the situation",
        prompt: "You cannot give one fixed answer yet. You say:",
        reply: "It depends.",
      },
      {
        id: "well-see",
        text: "we'll see",
        meaning: "let's wait before we decide",
        prompt: "You don't want to lock the plan yet. You say:",
        reply: "We'll see.",
      },
      {
        id: "either-way",
        text: "either way",
        meaning: "both options are fine with me",
        prompt: "Rain or no rain, you will still have a good time. You say:",
        reply: "Either way, I'm happy.",
      },
      {
        id: "ill-let-you-know",
        text: "I'll let you know",
        meaning: "I will tell you when I decide",
        prompt: "You need a few more minutes, then you will tell them. You say:",
        reply: "I'll let you know.",
      },
      {
        id: "play-it-by-ear",
        text: "play it by ear",
        meaning: "decide in the moment, not in advance",
        prompt: "You want no fixed plan, just a choice when you get there. You say:",
        reply: "Let's play it by ear.",
      },
    ],
  },
];

export const stories: Story[] = [...lifeStories, ...moreLifeStories, ...fabStories, ...moreFabStories, ...fabStoriesTwo];

function validate(list: Story[]) {
  const seen = new Set<string>();
  for (const story of list) {
    const have = new Set(story.phrases.map((phrase) => phrase.id));
    for (const phrase of story.phrases) {
      if (seen.has(phrase.id)) throw new Error(`Duplicate phrase id: ${phrase.id}`);
      seen.add(phrase.id);
      if (!story.text.includes(`{{${phrase.id}}}`)) {
        throw new Error(`${story.id} never uses ${phrase.id}`);
      }
    }
    for (const match of story.text.matchAll(/\{\{([a-z0-9-]+)\}\}/g)) {
      if (!have.has(match[1])) throw new Error(`${story.id} is missing phrase ${match[1]}`);
    }
    for (const turn of story.turns ?? []) {
      if (!have.has(turn.phraseId)) throw new Error(`${story.id} turn missing ${turn.phraseId}`);
    }
  }
}

validate(stories);

export function storyById(id: string): Story | undefined {
  return stories.find((story) => story.id === id);
}

export function findPhrase(id: string): { phrase: Phrase; story: Story } | undefined {
  for (const story of stories) {
    const phrase = story.phrases.find((item) => item.id === id);
    if (phrase) return { phrase, story };
  }
  return undefined;
}

export function storyForDate(date: Date): Story {
  return pickByDay(stories, date);
}

// Level 0 means any level. If nothing matches the level, fall back to the whole group.
function groupFor(group: "fab" | "life", level: number): Story[] {
  const all = stories.filter((story) => (group === "fab" ? story.category === "Fab" : story.category !== "Fab"));
  if (level === 0) return all;
  const matching = all.filter((story) => levelOf(story.id) === level);
  return matching.length > 0 ? matching : all;
}

export function fabForDate(date: Date, level = 0): Story {
  return pickByDay(groupFor("fab", level), date);
}

export function lifeForDate(date: Date, level = 0): Story {
  return pickByDay(groupFor("life", level), date);
}

function pickByDay(list: Story[], date: Date): Story {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
  const index = ((day % list.length) + list.length) % list.length;
  return list[index]!;
}

export function turnsFor(story: Story): Turn[] {
  if (story.turns && story.turns.length > 0) return story.turns;
  return story.phrases.map((phrase) => ({
    id: phrase.id,
    partner: "",
    cue: phrase.prompt.replace(/:$/, ""),
    you: phrase.reply,
    phraseId: phrase.id,
  }));
}

export type Block =
  | { type: "text"; value: string }
  | { type: "phrase"; id: string; label: string };

function shouldCapitalize(prev: string) {
  const trimmed = prev.trimEnd();
  if (!trimmed) return true;
  return /[.!?]["”']?\s*$/.test(trimmed) || /["“']\s*$/.test(trimmed);
}

function labelFor(text: string, prev: string) {
  if (!shouldCapitalize(prev)) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function parseStory(story: Story): Block[][] {
  return story.text
    .trim()
    .split(/\n\n+/)
    .map((paragraph) => {
      const parts: Block[] = [];
      const re = /\{\{([a-z0-9-]+)\}\}/g;
      let last = 0;
      let prev = "";
      let match: RegExpExecArray | null;
      while ((match = re.exec(paragraph))) {
        const raw = paragraph.slice(last, match.index);
        if (raw) {
          parts.push({ type: "text", value: raw });
          prev += raw;
        }
        const phrase = story.phrases.find((item) => item.id === match?.[1]);
        if (phrase) {
          parts.push({ type: "phrase", id: phrase.id, label: labelFor(phrase.text, prev) });
          prev += phrase.text;
        }
        last = match.index + match[0].length;
      }
      const tail = paragraph.slice(last);
      if (tail) parts.push({ type: "text", value: tail });
      return parts;
    });
}
