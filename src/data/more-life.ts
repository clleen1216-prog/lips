import type { Category, Story } from "./stories";

type Beat = {
  id: string;
  text: string;
  meaning: string;
  partner: string;
  cue: string;
  you: string;
};

export function scene(input: {
  id: string;
  title: string;
  topic: string;
  category: Category;
  scene: string;
  partner: string;
  minutes?: number;
  text: string;
  beats: Beat[];
}): Story {
  return {
    id: input.id,
    title: input.title,
    topic: input.topic,
    category: input.category,
    scene: input.scene,
    minutes: input.minutes ?? 2,
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

export const moreLifeStories: Story[] = [
  scene({
    id: "landlord",
    title: "The leaking tap",
    topic: "Asking for a repair",
    category: "Home",
    scene: "Three days of drip. One polite phone call.",
    partner: "Mr. Chen, landlord",
    text: `The tap has been dripping since Sunday. Maya has been counting drops instead of calling.

"Hello, Mr. Chen? It's Maya in 4B. The kitchen tap has {{lord-stopped-working}} properly. It leaks all night."

"I see. What would you like me to do?"

"{{lord-could-someone-come}} and look at it this week?"

"Of course. When are you home?"

"{{lord-whenever-suits-you}}. I work from home on Wednesday."

"And {{lord-in-the-meantime}}?"

"I'll put a bowl under it. {{lord-thanks-for-sorting-it-out}}."`,
    beats: [
      {
        id: "lord-stopped-working",
        text: "stopped working",
        meaning: "it does not work the way it should",
        partner: "Hello? Mr. Chen speaking.",
        cue: "State the problem in one clear line.",
        you: "The kitchen tap has stopped working properly.",
      },
      {
        id: "lord-could-someone-come",
        text: "could someone come",
        meaning: "a polite request for a person to visit and help",
        partner: "I see. What would you like me to do?",
        cue: "Make a polite request, not a demand.",
        you: "Could someone come and look at it this week?",
      },
      {
        id: "lord-whenever-suits-you",
        text: "whenever suits you",
        meaning: "any time that is convenient for you",
        partner: "When are you home?",
        cue: "Let them choose, with one useful fact.",
        you: "Whenever suits you. I work from home on Wednesday.",
      },
      {
        id: "lord-in-the-meantime",
        text: "in the meantime",
        meaning: "during the time before something happens",
        partner: "What will you do until then?",
        cue: "Show you are being sensible while you wait.",
        you: "In the meantime, I'll put a bowl under it.",
      },
      {
        id: "lord-thanks-for-sorting-it-out",
        text: "thanks for sorting it out",
        meaning: "thank you for solving the problem",
        partner: "Okay, someone will come on Wednesday.",
        cue: "Close the call with a warm thank you.",
        you: "Thanks for sorting it out.",
      },
    ],
  }),
  scene({
    id: "doctor",
    title: "Third day of a cough",
    topic: "At the doctor",
    category: "Out",
    scene: "Five minutes with a doctor who has twenty patients today.",
    partner: "Dr. Wu",
    text: `The waiting room is quiet and slightly too warm. Maya's name is called.

"What brings you in today?"

"{{doc-ive-been-feeling}} tired and dizzy, and the cough won't go away."

"How long?"

"{{doc-since-monday}}. It's worse at night."

The doctor listens to her chest. "Any pain?"

"{{doc-it-hurts-when}} I breathe in deeply."

Dr. Wu types a note. Maya asks the question she's been holding: "{{doc-is-it-serious}}?"

"I don't think so. But take this."

"{{doc-how-often-should-i-take-it}}?"`,
    beats: [
      {
        id: "doc-ive-been-feeling",
        text: "I've been feeling",
        meaning: "describing how you have felt over a recent period",
        partner: "What brings you in today?",
        cue: "Start with how you feel in plain words.",
        you: "I've been feeling tired and dizzy, and the cough won't go away.",
      },
      {
        id: "doc-since-monday",
        text: "since Monday",
        meaning: "from that day until now",
        partner: "How long has this been going on?",
        cue: "Give the start time, not just a general idea.",
        you: "Since Monday. It's worse at night.",
      },
      {
        id: "doc-it-hurts-when",
        text: "it hurts when",
        meaning: "pain happens during a specific action",
        partner: "Any pain?",
        cue: "Connect the pain to a specific action.",
        you: "It hurts when I breathe in deeply.",
      },
      {
        id: "doc-is-it-serious",
        text: "is it serious",
        meaning: "ask whether the problem is dangerous",
        partner: "I'll write you something.",
        cue: "Ask what is worrying you most.",
        you: "Is it serious?",
      },
      {
        id: "doc-how-often-should-i-take-it",
        text: "how often should I take it",
        meaning: "ask the frequency of a medicine",
        partner: "I don't think so. Take this medicine.",
        cue: "Ask how to use it before you leave.",
        you: "How often should I take it?",
      },
    ],
  }),
  scene({
    id: "restaurant",
    title: "Table for two",
    topic: "Eating out",
    category: "Out",
    scene: "A small place, a long menu, and a waiter who is kind and busy.",
    partner: "The waiter",
    text: `The restaurant is full of the smell of garlic and warm bread.

"{{rest-table-for-two}}, please," Maya says.

They are seated by the window. The menu is long and written in small letters.

"{{rest-could-we-see-the-menu}}? And some water?"

"Of course. Have you decided?"

Maya hasn't. "{{rest-what-do-you-recommend}}?"

"The fish is fresh today."

"Then I'll take that." Later, with the plates empty: "{{rest-can-we-get-the-check}}, please?"

At the door, she hands over the cash. "{{rest-keep-the-change}}."`,
    beats: [
      {
        id: "rest-table-for-two",
        text: "table for two",
        meaning: "you ask for a table for two people",
        partner: "Welcome! How many people?",
        cue: "Answer in three words.",
        you: "Table for two, please.",
      },
      {
        id: "rest-could-we-see-the-menu",
        text: "could we see the menu",
        meaning: "a polite request to look at the food list",
        partner: "Here's your table.",
        cue: "Ask politely. Add one more small request.",
        you: "Could we see the menu? And some water, please.",
      },
      {
        id: "rest-what-do-you-recommend",
        text: "what do you recommend",
        meaning: "ask for their suggestion",
        partner: "Have you decided?",
        cue: "Ask for help instead of guessing.",
        you: "What do you recommend?",
      },
      {
        id: "rest-can-we-get-the-check",
        text: "can we get the check",
        meaning: "ask for the bill",
        partner: "Anything else for you?",
        cue: "Ask for the bill politely.",
        you: "Can we get the check, please?",
      },
      {
        id: "rest-keep-the-change",
        text: "keep the change",
        meaning: "you do not need the extra money back",
        partner: "Here is your change.",
        cue: "Leave a small tip with one phrase.",
        you: "Keep the change.",
      },
    ],
  }),
  scene({
    id: "hotel",
    title: "Late arrival",
    topic: "Hotel check-in",
    category: "Travel",
    scene: "The flight was late. The desk is quiet. Tomorrow starts early.",
    partner: "Front desk",
    text: `It is almost midnight when Maya reaches the front desk. The lobby is soft and empty.

"{{hotel-i-have-a-reservation}} under Lin."

"Welcome. May I see your passport?"

She hands it over. "{{hotel-is-breakfast-included}}?"

"Yes, from six to ten."

"And {{hotel-what-time-is-checkout}}?"

"Eleven o'clock."

She has a late flight tomorrow. "{{hotel-could-i-get-a-late-checkout}}? Maybe until two?"

In her room, the wifi screen shows an error. She calls the desk. "{{hotel-the-wifi-isnt-working}}."`,
    beats: [
      {
        id: "hotel-i-have-a-reservation",
        text: "I have a reservation",
        meaning: "you booked a room in advance",
        partner: "Good evening. How can I help?",
        cue: "Start with the reservation and the name.",
        you: "I have a reservation under Lin.",
      },
      {
        id: "hotel-is-breakfast-included",
        text: "is breakfast included",
        meaning: "ask whether the price already covers breakfast",
        partner: "You're all set. Here's your key.",
        cue: "Ask about breakfast before you go upstairs.",
        you: "Is breakfast included?",
      },
      {
        id: "hotel-what-time-is-checkout",
        text: "what time is checkout",
        meaning: "ask when you must leave the room",
        partner: "Yes, from six to ten.",
        cue: "Ask the time. You do not want a surprise.",
        you: "What time is checkout?",
      },
      {
        id: "hotel-could-i-get-a-late-checkout",
        text: "could I get a late checkout",
        meaning: "ask to leave the room later than normal",
        partner: "Eleven o'clock.",
        cue: "Ask for a later time, politely.",
        you: "Could I get a late checkout? Maybe until two?",
      },
      {
        id: "hotel-the-wifi-isnt-working",
        text: "the wifi isn't working",
        meaning: "the internet connection has a problem",
        partner: "Front desk, how can I help?",
        cue: "Report a problem in one short line.",
        you: "The wifi isn't working in my room.",
      },
    ],
  }),
  scene({
    id: "returns",
    title: "Wrong size",
    topic: "Returning something",
    category: "Out",
    scene: "A jacket bought online. A counter with a queue.",
    partner: "Store clerk",
    text: `The queue at the returns counter is short but slow. Maya holds the bag in front of her like a shield.

"{{ret-i-would-like-to-return}} this jacket. It's the wrong size."

"Do you have the receipt?"

"{{ret-i-dont-have-the-receipt}} with me. But I have the order email."

"That works. What would you like instead?"

"{{ret-can-i-exchange-it}} for a medium?"

"We're out of mediums."

"Then {{ret-store-credit}} is fine. Also, {{ret-is-there-a-warranty}} on the zipper?"`,
    beats: [
      {
        id: "ret-i-would-like-to-return",
        text: "I'd like to return",
        meaning: "you want to bring something back to the shop",
        partner: "Next, please. How can I help?",
        cue: "State your wish and the reason.",
        you: "I'd like to return this jacket. It's the wrong size.",
      },
      {
        id: "ret-i-dont-have-the-receipt",
        text: "I don't have the receipt",
        meaning: "you cannot show the proof of purchase",
        partner: "Do you have the receipt?",
        cue: "Be honest, and offer another proof.",
        you: "I don't have the receipt with me, but I have the order email.",
      },
      {
        id: "ret-can-i-exchange-it",
        text: "can I exchange it",
        meaning: "ask to swap it for another one",
        partner: "What would you like instead?",
        cue: "Ask for the swap you prefer.",
        you: "Can I exchange it for a medium?",
      },
      {
        id: "ret-store-credit",
        text: "store credit",
        meaning: "money you can only spend in that shop",
        partner: "We're out of mediums. I can refund the card or give store credit.",
        cue: "Choose an option in one phrase.",
        you: "Store credit is fine.",
      },
      {
        id: "ret-is-there-a-warranty",
        text: "is there a warranty",
        meaning: "ask whether the shop will fix problems for free",
        partner: "Anything else?",
        cue: "Ask about the future, not only today.",
        you: "Is there a warranty on the zipper?",
      },
    ],
  }),
  scene({
    id: "birthday",
    title: "Candles",
    topic: "A birthday",
    category: "Friends",
    scene: "A small cake, a loud song, and a gift wrapped badly on purpose.",
    partner: "Mei, a friend",
    text: `The lights go out. The cake arrives with too many candles and one that will not stay lit.

"{{bday-happy-birthday}}, Mei!" everyone shouts.

"{{bday-make-a-wish}}," Maya says, and Mei closes her eyes for a long second.

The candles go out in one breath. Cheering. Then a small gift appears.

"You didn't have to... {{bday-you-shouldnt-have}}."

"It's small. I saw it and thought of you."

Mei's eyes are bright. "{{bday-it-means-a-lot}}. Really."

At the end of the night, at the door: "{{bday-thanks-for-coming}}."`,
    beats: [
      {
        id: "bday-happy-birthday",
        text: "happy birthday",
        meaning: "the standard greeting on someone's birthday",
        partner: "",
        cue: "Say it warmly. This one is simple.",
        you: "Happy birthday, Mei!",
      },
      {
        id: "bday-make-a-wish",
        text: "make a wish",
        meaning: "silently ask for something good before blowing out candles",
        partner: "Thank you, everyone!",
        cue: "Invite the birthday person to take a moment.",
        you: "Make a wish!",
      },
      {
        id: "bday-you-shouldnt-have",
        text: "you shouldn't have",
        meaning: "a warm way to say a gift was kind",
        partner: "This is for you. Happy birthday.",
        cue: "Receive a gift with warmth and a little modesty.",
        you: "Oh, you shouldn't have!",
      },
      {
        id: "bday-it-means-a-lot",
        text: "it means a lot",
        meaning: "something is important to you emotionally",
        partner: "I saw it and thought of you.",
        cue: "Say something sincere in four words.",
        you: "It means a lot to me.",
      },
      {
        id: "bday-thanks-for-coming",
        text: "thanks for coming",
        meaning: "thank someone for being at your event",
        partner: "I had such a good time.",
        cue: "End the evening with a warm goodbye.",
        you: "Thanks for coming. It meant a lot.",
      },
    ],
  }),
  scene({
    id: "time-off",
    title: "A week in March",
    topic: "Asking for time off",
    category: "Work",
    scene: "A holiday booked in January. A form, a manager, and one handover to organize.",
    partner: "Ethan, manager",
    text: `Maya has had the form on her desktop for three days. Today she opens it.

"Ethan, {{leave-i-would-like-to-request}} a week of leave in March."

"Which dates?"

"The tenth to the sixteenth. I'd like to {{leave-take-some-time-off}} to visit my parents."

Ethan checks the calendar. "That's the audit prep week."

"I know. {{leave-ill-hand-over}} everything before I go, with notes."

"And who can {{leave-cover-for-me}} on the audit?"

"Priya has done it before." She smiles. "{{leave-back-on-monday}} the seventeenth."`,
    beats: [
      {
        id: "leave-i-would-like-to-request",
        text: "I'd like to request",
        meaning: "a formal, polite way to ask for something",
        partner: "You wanted to talk?",
        cue: "Use the formal opener for a formal request.",
        you: "I'd like to request a week of leave in March.",
      },
      {
        id: "leave-take-some-time-off",
        text: "take some time off",
        meaning: "be away from work for a while",
        partner: "Which dates, and why?",
        cue: "Give the dates and one reason.",
        you: "The tenth to the sixteenth. I'd like to take some time off to visit my parents.",
      },
      {
        id: "leave-ill-hand-over",
        text: "I'll hand over",
        meaning: "you will give your work to someone before you leave",
        partner: "That's the audit prep week.",
        cue: "Answer the worry before they say it twice.",
        you: "I know. I'll hand over everything before I go, with notes.",
      },
      {
        id: "leave-cover-for-me",
        text: "cover for me",
        meaning: "do my job while I am away",
        partner: "Who can take the audit?",
        cue: "Suggest a specific person.",
        you: "Priya can cover for me. She has done it before.",
      },
      {
        id: "leave-back-on-monday",
        text: "back on Monday",
        meaning: "you will return to work that day",
        partner: "Alright. Approved.",
        cue: "Confirm the return date in four words.",
        you: "Thank you. I'll be back on Monday the seventeenth.",
      },
    ],
  }),
  scene({
    id: "checkin",
    title: "Counter nine",
    topic: "Airport check-in",
    category: "Travel",
    scene: "A long line, a short temper, and a seat that decides the next four hours.",
    partner: "Airline agent",
    text: `Counter nine has a green light and a tired agent. Maya steps forward with her passport open.

"{{air-checking-in-for}} the 14:20 flight to Tokyo."

"Passport, please. {{air-aisle-or-window}}?"

"Aisle, please. I like to stretch my legs."

"{{air-any-bags-to-check}}?"

"Just this one. And a small bag for the cabin."

The agent prints the boarding pass. "Your {{air-boarding-time}} is 13:40."

"{{air-which-gate}}?"

"Gate twelve. Have a good flight."`,
    beats: [
      {
        id: "air-checking-in-for",
        text: "checking in for",
        meaning: "registering for a flight",
        partner: "Next. How can I help?",
        cue: "Say which flight, and where it goes.",
        you: "I'm checking in for the 14:20 flight to Tokyo.",
      },
      {
        id: "air-aisle-or-window",
        text: "aisle or window",
        meaning: "the choice of seat position",
        partner: "Aisle or window?",
        cue: "Choose one, and give a short reason.",
        you: "Aisle, please. I like to stretch my legs.",
      },
      {
        id: "air-any-bags-to-check",
        text: "any bags to check",
        meaning: "do you have luggage to put in the hold",
        partner: "Any bags to check?",
        cue: "Answer with the exact number.",
        you: "Just one bag, and a small one for the cabin.",
      },
      {
        id: "air-which-gate",
        text: "which gate",
        meaning: "ask where the plane will leave from",
        partner: "Boarding is at 13:40.",
        cue: "Ask the one thing you still need.",
        you: "Which gate is it?",
      },
      {
        id: "air-boarding-time",
        text: "boarding time",
        meaning: "when you are allowed to enter the plane",
        partner: "Gate twelve.",
        cue: "Repeat to confirm, so there is no mistake.",
        you: "Gate twelve, and boarding time is 13:40. Thank you.",
      },
    ],
  }),
  scene({
    id: "hike",
    title: "Switchbacks",
    topic: "A weekend hike",
    category: "Plans",
    scene: "A trail that looks easy on the map and not on the legs.",
    partner: "Jon, a friend",
    text: `Jon texts at seven in the morning with three exclamation marks.

"{{hike-are-you-up-for}} a hike on Saturday?"

"Where?"

"The ridge trail. About four hours."

"{{hike-bring-layers}}," Maya texts back. "It's cold at the top."

On Saturday the path climbs in tight turns. After an hour her legs start to burn. "{{hike-take-a-break}}?"

"Five minutes," Jon says, and they sit on a rock.

At the summit the whole valley is below them. "{{hike-worth-the-climb}}," Jon says.

"{{hike-hit-the-trail}} again?" Maya asks. "The way down is faster."`,
    beats: [
      {
        id: "hike-are-you-up-for",
        text: "are you up for",
        meaning: "ask if someone wants to take part in an activity",
        partner: "",
        cue: "Invite a friend to a plan.",
        you: "Are you up for a hike on Saturday?",
      },
      {
        id: "hike-bring-layers",
        text: "bring layers",
        meaning: "wear or carry extra clothes you can add or remove",
        partner: "Is it cold up there?",
        cue: "Give the practical advice in two words.",
        you: "Bring layers. It's cold at the top.",
      },
      {
        id: "hike-take-a-break",
        text: "take a break",
        meaning: "stop and rest for a short time",
        partner: "How are you doing?",
        cue: "Ask for a rest without making it a big thing.",
        you: "Can we take a break?",
      },
      {
        id: "hike-worth-the-climb",
        text: "worth the climb",
        meaning: "the effort was good because the result is great",
        partner: "Look at that view.",
        cue: "React to something beautiful in three words.",
        you: "Totally worth the climb.",
      },
      {
        id: "hike-hit-the-trail",
        text: "hit the trail",
        meaning: "start walking along the path",
        partner: "Ready to head down?",
        cue: "Say it lightly. It is a friendly phrase.",
        you: "Ready. Let's hit the trail again.",
      },
    ],
  }),
];
