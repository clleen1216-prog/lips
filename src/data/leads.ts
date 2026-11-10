// What the other person says right before your line, for the everyday stories
// that were first written as single prompts. This turns each scene into a real
// back-and-forth: they speak, you answer.
export const leads: Record<string, string> = {
  // The 8:12
  "running-late": "Hi, are you coming? We're about to start the meeting.",
  "on-my-way": "Hey, are you still at home?",
  "stuck-in-traffic": "Where are you? It's been twenty minutes.",
  "hang-on": "Quick question. What time is the review on Friday?",
  "ill-be-right-there": "Are you close? Everyone is already here.",
  // Corner table
  "long-time-no-see": "Maya? Is that you?",
  "hows-it-going": "Hi! Sit down. It's been so long.",
  "catch-up": "I'd love to hear everything. What's new with you?",
  "grab-a-coffee": "I should go soon. But it was great to see you.",
  "so-far-so-good": "So how's the new job?",
  // The thread
  "im-in": "We're doing a picnic on Saturday. Who's coming?",
  "count-me-in": "I'm making the list. Should I write your name?",
  "up-to-you": "Park or the river? What do you prefer?",
  "works-for-me": "What about four o'clock?",
  "rain-check": "Are you free tonight? We're all going out.",
  // Sugar and a key
  "do-you-mind": "Hi! Come in. What can I do for you?",
  "no-worries": "Sorry to bother you again. Thank you so much for the key.",
  "whenever-youre-ready": "I need five minutes to find my keys. Is that okay?",
  "appreciate-it": "Here's the spare key. Anything else you need?",
  "i-owe-you-one": "Don't worry about it. I was home anyway.",
  // Not tonight
  "something-came-up": "Hey! Why are you calling? Is everything okay?",
  "i-cant-make-it": "Are you coming to dinner at seven?",
  "my-bad": "We booked a table for four. Why didn't you say?",
  "keep-me-posted": "We'll try to move it to the weekend. Is that okay?",
  "another-time": "Oh no. That's a shame.",
  // After four
  "heads-up": "Do you have a second before your next meeting?",
  "running-behind": "Is the meeting almost over? I'm next.",
  "on-the-same-page": "So, does everyone agree on the plan?",
  "circle-back": "We still haven't talked about the budget.",
  "call-it-a-day": "It's almost seven. Anything else?",
  // One bill, four forks
  "im-starving": "How's your day? You look tired.",
  "grab-a-bite": "I'm not very hungry. Should we get something light?",
  "on-me": "The waiter's here. Who is paying?",
  "lets-split-it": "It's thirty-two each. That's way too much.",
  "im-good": "Do you want the last fry?",
  // One stop early
  "excuse-me": "",
  "a-bit-lost": "You look confused. Can I help?",
  "which-way": "Sure. Where are you going?",
  "no-problem": "Thank you so much! You've been a big help.",
  "take-care": "Well, I'd better get to my train.",
  // Read it again
  "i-didnt-mean-it-like-that": "Your message last night sounded really angry.",
  "the-thing-is": "So what did you mean?",
  "you-know-what-i-mean": "I just didn't know how to read it.",
  "no-big-deal": "I'm so sorry I replied that way.",
  "were-good": "So... are we okay now?",
  // First Monday
  "nice-to-meet-you": "Maya, this is Ethan from the quality team.",
  "getting-the-hang-of-it": "How's the first day going?",
  "bear-with-me": "It's a lot of new systems. Do you need anything?",
  "let-me-know": "I can show you around the floor later.",
  "sounds-good": "Let's have lunch together at noon.",
  // Wet shoes
  "im-beat": "Hey, welcome home. How was your day?",
  "hang-in-there": "Work is a disaster this week. I'm so tired.",
  "could-be-worse": "Your shoes are soaked! Bad day?",
  "take-it-easy": "Do you want to finish the report tonight?",
  "call-it-a-night": "It's nearly midnight. What do you think?",
  // Third floor
  "give-me-a-hand": "Hey, you look busy. What are you doing?",
  "i-got-you": "This box is so heavy. I don't know if I can do this.",
  "no-rush": "Sorry, am I going too slowly?",
  "weighs-a-ton": "Okay, lift on three. One, two, three!",
  "almost-there": "How many more stairs?",
  // A soft no
  "i-dont-think-i-can": "We're having a barbecue on Sunday. Can you come?",
  "maybe-next-time": "That's a shame. We'd love to see you.",
  "no-pressure": "Let me know if anything changes.",
  "all-good": "Sorry again that I can't make it.",
  "your-call": "Should we go to the barbecue place or the Italian one?",
  // Gate B12
  "looks-like": "Do you know what's happening with the flight?",
  "up-in-the-air": "Do you think we'll leave on time?",
  "hang-tight": "I'm worried about my connection.",
  "keep-you-posted": "Will you tell me if you hear anything?",
  "fingers-crossed": "I hope it's only a thirty-minute delay.",
  // Under the weather
  "under-the-weather": "You don't look so good. What's wrong?",
  "call-in": "Are you going to the office today?",
  "take-the-day-off": "You should rest. Can you take the day?",
  "dont-push-it": "I'll just finish a few emails. I'm fine.",
  "feel-better": "Okay, I'm going back to bed. Talk later.",
  // The yellow line
  "gotta-run": "So, anyway, as I was saying...",
  "catch-you-later": "Oh, is that your train?",
  "talk-soon": "Let's keep in touch!",
  "see-you-then": "So, Thursday at six?",
  "hit-the-road": "It's getting late. We should leave before it rains.",
  // After the demo
  "not-gonna-lie": "You looked so calm during the presentation.",
  "it-went-well": "So? How was the demo?",
  "for-real": "The client loved it. They want to sign.",
  "told-you": "I can't believe it worked!",
  "drinks-on-me": "We should celebrate!",
  // No real plan
  "it-depends": "Are we going to the beach on Saturday?",
  "well-see": "But what if it rains?",
  "either-way": "So, rain or sun? What do you prefer?",
  "ill-let-you-know": "Can you tell me by tonight?",
  "play-it-by-ear": "So what's the plan for the weekend?",
};

// Partner name for each scene that has lead lines.
export const leadPartners: Record<string, string> = {
  late: "A colleague",
  coffee: "An old friend",
  saturday: "Jun, a friend",
  favor: "Your neighbor",
  cancel: "Mei, a friend",
  meeting: "A colleague",
  check: "A friend",
  lost: "A stranger",
  text: "A friend",
  desk: "A new coworker",
  rain: "Your housemate",
  boxes: "A friend",
  "soft-no": "A friend",
  gate: "A fellow traveler",
  sick: "A friend",
  bye: "A friend",
  win: "A teammate",
  ear: "A friend",
};
