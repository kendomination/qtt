var db;
var html;
var easy = [];
var medium = [];
var hard = [];
var lewp = 0;
var lvcntr=0;
var lvs=5;
db = openDatabase('qtt', '1.0', 'A Kamote Empire Inc', 2 * 1024 * 1024); 

var myCounter = new Countdown({  
    seconds:30,
    onUpdateStatus: function(sec){document.getElementById('tmr').innerHTML="Time Left: "+sec;},
    onCounterEnd: function(){window.location.href='#frm_result'
	document.getElementById('txtresult').innerHTML = "Game over! you have completed "+lvcntr+" level(s) with "+lvs+" live(s) remaining!";}
});

function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}

db.transaction(function (tx) { 
	tx.executeSql('CREATE TABLE score (score INTEGER NOT NULL, word INTEGER NOT NULL, ts DATE NOT NULL, cd TEXT NOT NULL)',[]); 
}); 

function addScore(x,y,z,j){
	db.transaction(function (tx) { 
		tx.executeSql('INSERT INTO score (score, word, ts, cd) VALUES(?,?,?,?)',[x,y,z,j]); 
	}); 	
}

function getLevel(){
	db.transaction(function (tx) { 
		tx.executeSql("SELECT * from score where word = 7 ORDER BY score DESC", [], function(tx,results){	
			var y = results.rows.length, j;	
			if (y > 5){
				y = 5;
			}
			html = "<div data-role=collapsible-set>";
			html += "<div data-role=collapsible>";
			html += "<h3>BEGINNER</h3>";
			for (j = 0; j < y; j++) {	
				html += "<div class=ui-grid-a data-role=controlgroup>";
				html += "<div class=ui-block-a><h3>" + results.rows.item(j).score + " wpm</h3></div>";
				html += "<div class=ui-block-b><h3>" + results.rows.item(j).cd + "</h3></div>";	
				html += "</div>";
			}
			html += "</div>";
			html += "</div>";
			
			document.getElementById("easy").innerHTML = html;
		}); 			
	});

	db.transaction(function (tx) { 
		tx.executeSql("SELECT * from score where word = 10 ORDER BY score DESC", [], function(tx,results){	
			var y = results.rows.length, j;		
			if (y > 5){
				y = 5;
			}
			html = "<div data-role=collapsible-set>";			
			html += "<div data-role=collapsible>";
			html += "<h3>NOVICE</h3>";
			for (j = 0; j < y; j++) {	
				html += "<div class=ui-grid-a data-role=controlgroup>";
				html += "<div class=ui-block-a><h3>" + results.rows.item(j).score + " wpm</h3></div>";
				html += "<div class=ui-block-b><h3>" + results.rows.item(j).cd + "</h3></div>";	
				html += "</div>";
			}
			html += "</div>";
			html += "</div>";
			
			document.getElementById("medium").innerHTML = html;
		}); 			
	});

	db.transaction(function (tx) { 
		tx.executeSql("SELECT * from score where word = 15 ORDER BY score DESC", [], function(tx,results){	
			var y = results.rows.length, j;		
			if (y > 5){
				y = 5;
			}			
			html = "<div data-role=collapsible-set>";			
			html += "<div data-role=collapsible>";
			html += "<h3>HARD</h3>";
			for (j = 0; j < y; j++) {	
				html += "<div class=ui-grid-a data-role=controlgroup>";
				html += "<div class=ui-block-a><h3>" + results.rows.item(j).score + " wpm</h3></div>";
				html += "<div class=ui-block-b><h3>" + results.rows.item(j).cd + "</h3></div>";		
				html += "</div>";
			}
			html += "</div>";
			html += "</div>";
			
			document.getElementById("hard").innerHTML = html;
		}); 			
	});
}

function plot(){
	  	db.transaction(function (tx) { 
			tx.executeSql("SELECT * from score where word = 7", [], function(tx,results){	
			var y = results.rows.length, j;	
			for (j = 0; j < y; j++) {	
				easy.push([j+1,results.rows.item(j).score])
			}	
				//$('#plotdata').val(setCharAt(pd,pd.lastIndexOf(','),""));
			});
		
	});	

	  	db.transaction(function (tx) { 
			tx.executeSql("SELECT * from score where word = 10", [], function(tx,results){	
			var y = results.rows.length, j;	
			for (j = 0; j < y; j++) {	
				medium.push([j+1,results.rows.item(j).score])
			}	
				//$('#plotdata').val(setCharAt(pd,pd.lastIndexOf(','),""));
			});
		
	});	

	  	db.transaction(function (tx) { 
			tx.executeSql("SELECT * from score where word = 15", [], function(tx,results){	
			var y = results.rows.length, j;	
			for (j = 0; j < y; j++) {	
				hard.push([j+1,results.rows.item(j).score])
			}	
				//$('#plotdata').val(setCharAt(pd,pd.lastIndexOf(','),""));
			});
		
	});	
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function fullver() {
	alert("Available in the FULL VERSION");
}

msg = new Array("Practicing your q-typing can greatly help your overall mobile skills.",
"A new q-device is sold in the world every hour!",
"When do birds migrate from North to South?",
"His irascible sense of humor endeared him to everyone else.",
"I felt a bit conspicious wearing a tuxedo to school.",
"Someone suffering from celiac syndrome is unable to digest wheat!",
"As always, because we were destitute, we had no choice!",
"He was so adept at his job of q-typing phrases.",
"We truly can't expound this diminutive sentence for more difficulty.",
"Strenuous phrases, like this one, are tougher to type.")
word = 10

function m() {
lewp = 0;
document.getElementById('tmr').innerHTML="";
var level = "NOVICE MODE";
document.getElementById('txtlevel').innerHTML = level;
msg = new Array("The window fell on the man and hurt him badly.",
"The football player tripped on the ball and hurt himself.",
"The giant squirrel fell badly on the man and exploded.",
"Earth attacks giant filthy pianos every time which ultimately annoys. ",
"I just bought three new books and a movie today.",
"Please sit down in the blue chair by the door.",
"Cows like to stand outside and eat grass all day.",
"Kate and Matt are members of the school swim team.",
"The tall girl tied her tennis shoes and went outside.",
"The girl picked the pink flower out of her garden.",
"Alice went to the animal shelter and got four cats!",
"Pam wants to play outside because it just stopped raining.",
"That is an impressive building with a red brick facade",
"These latest riots are a clear manifestation of growing discontent.",
"The horse trotted around the field at a brisk pace.",
"The source of the huge river is the clear spring.",
"The nearby store was jammed before the sale could start.",
"It was a bad error on the part of the judges.",
"Take the giant ball and strike it against your shoe.",
"She stares at the hard working man in the store.",
"My first post completely sober, no chemicals so no sleep.",
"Is it wrong to get sober so drugs work better",
"Ten word sentences are fun when dealing with continued insomnia",
"Definitely feel more than usual, littlest things make me cry.",
"This exercise is making me tired and ready to sleep.",
"I have trouble understanding the necessity of pain in existence.",
"We could not think of a suitable epitaph for his gravestone",
"If I knew the way, I would take you home.",
"Time flies like an arrow, while fruit flies like bananas.",
"A clear conscience is the sign of a fuzzy memory.",
"War doesn't determine who is right, only who is left.",
"Where there's a will, I want to be in it.",
"Then I felt a bubble form somewhere below my skin.",
"Thank you for sharing your story, sorry for your pain.",
"A shared story is better than restraint in my opinion.",
"I was more thinking about spiritual pain versus physical pain.",
"Seems like our world hurts deep with only superficial cures.",
"Every single person has a struggle, whether obvious or hidden.",
"Maybe that is why I am intent on following Phish.",
"It could be that I have lost my motherfucking mind.",
"All evidence however is to the contrary, ignorance was bliss",
"When my uncoordinated ass starts moving it seems quite spiritual",
"Finding joy through the celebration of life and giving thanks",
"Always have to tell my story to a struggling brother.",
"Now have a good day and keep being yourself brothers.",
"Wait I realized I totally missed the point of that.",
"I have trouble understanding the necessity of pain in existence.",
"Massive migraine yesterday, my brain feels like a fried egg.",
"Extra points for a rhyme, only if it’s in time.",
"I love playing with words; captivating entertainment for super nerds.",
"Pitch the straw through the door of the stable farm.",
"Great call on eleven words being more than ten words.",
"A new computer is sold in the US every hour.",
"Practicing your typing can greatly help your overall computer skills.",
"The good book informs of what we ought to know.",
"Pick a card and slip it under the Christmas tree.",
"A cruise in warm waters in a yacht is fun.",
"Big black goose was brought straight from the old market.",
"He put his last cartridge into the gun and fired.",
"Stop whistling and watch the boys march into the corridor",
"Slide the tray across the glass top to get chocolates.",
"Sever the twine with a quick snip of the knife.",
"He put his last cartridge into the gun and fired.",
"Wake and rise, and step into the bright Sunday morning.",
"A round hole was drilled thoroughly through the thin board.",
"The weight. of the package was seen on the high scale.",
"Down that road is the way to the grain farmer.",
"At night the alarm roused him from a deep sleep.",
"Fill your pack with bright trinkets for the poor kids.",
"Delicious bowl of rice is free with hot chicken stew.",
"In the rear of the ground floor was a passage.",
"Five years he lived with a shaggy dog named Bullet.",
"Zahra’s new pink thick glasses helped her read the print.",
"Throw out the used paper cup, spoon and plate outside.",
"Big money will be needed to pay his rent expense.",
"A sash of gold silk will trim her gorgeous dress.",
"He took the lead and kept it the whole distance.",
"The big logs fell and tumbled into the clear stream.",
"Nine rows of soldiers stood in line across the lieutenant.",
"Fill the ink jar with sticky glue and scotch tape.",
"His shirt was clean and ironed but one button was gone.",
"Quench your thirst, and then eat the crackers and lobsters.",
"His continued lying caused everyone to regard everything he said.",
"They made four tarts and put plum jam in them.",
"Write a short funny note to the friend you cherish.",
"Heaven won't take me and hells afraid I'll take over.",
"Today isn't your day and tomorrow doesn’t look good either.",
"An expert is someone who takes a subject you understand.",
"Alcohol doesn't solve problems, but then again, neither does milk.",
"I smile because I have no idea what's going on.",
"The unique beauty of the view stunned the young boy.",
"A saw is a great tool used for making boards.",
"The bark of the pine tree was shiny and dark.",
"They must wait in their barn until the rain stops.",
"Early morning there were many more sheep in the pen.",
"Hemp is a weed found in parts of the tropics.",
"The glow deepened in the eyes of the sweet girl.",
"The source of the huge river is the clear spring.",
"The thick rope will bind the seven books at once",
"Some of today's inventions are made of steel and plastic",
"If you can wait forever, what would you wait for?")
word = 10
}
function e() {
lewp = 0;
document.getElementById('tmr').innerHTML="";
var level = "HARD MODE";
document.getElementById('txtlevel').innerHTML = level;
msg = new Array("In a wonderful day at the zoo, we saw lions, tigers, bears and exotic birds.",
"We had cold milk, ham, bread, butter, corn, peas and carrots for dinner last night.",
"The activities at summer camp will include tennis, swimming, basketball, soccer, hiking, baseball and archery.",
"Today, I’ll remind myself that I am not a failure if I am not perfect.",
"Its 12:16 and I miss you so very much more than I did at 12:14.",
"High Octane, Jet Fuel, Morning Thunder, Leaded, High Test, Liquid Lightning, Cup O’ Joe, C O F F E E!!!!!!!!!",
"Flowing over me and away, and back over another day. Like surf creeping further ashore.",
"Once upon a time, I was asked to write a fifteen word story. The end.",
"People come and people go but my power over you is forever, I am omnipotent.",
"I want to die in my sleep, he sighed. You will, she replied smiling smugly.",
"I found a picture of myself sleeping on my phone, but strangely I live alone.  ",
"My friend sneezed in the shower; and sharted. Thank god he was in the shower.",
"My longing is a thirst and you are the cool, refreshing water that quenches it.",
"Whatever comes, let it come. What stays, let it stay. What goes, let it go.",
"When others complain; no person ever has direct unfairness, challenge is a way of life.",
"Tonight I quit smoking. But it’ll take time to quit you; if I even can.",
"She said to him: 'You are darkness, I am light - I will illuminate your night'.",
"Gods' God; Evils' Destroyer; Passionate Lover; Fierce Warrior; Consummate Dancer; Charismatic Leader; Quick Temper; Incorruptible.",
"I’ll stop walking backwards; forcing myself to look onward. Soon it’ll be just a dream",
"The ability to wipe away the tears and absorb the pain of those I cherish",
"Fleeting breath, tingling fingers, mind racing, accepting this was forever. The disease that was her mind.",
"Think I've found the end of a rainbow, it is always the beginning.",
"Revenge, justice, satisfaction...Mac had no interest in vocabulary games...this was going to stop.",
"Looking out the window, sometimes I wonder: Are you looking out the window, wondering too?",
"Once upon a time, I was asked to write a fifteen word story. The end",
"Tonight I quit smoking. But it’ll take time to quit you; if I even can.",
"My friend sneezed in the shower; and sharted. Thank god he was in the shower.",
"I’ll stop walking backwards; forcing myself to look onward. Soon it’ll be just a dream.",
"I’m gonna to turn my life around and start with a run tomorrow morning. Yes!",
"When others complain; no person ever has direct unfairness, challenge is a way of life.",
"Life ebbed, blood flowed; Life ebbed, tears flowed; Footsteps hurried, rats scurried; His spirit soared.",
"Fleeting breath, tingling fingers, mind racing, accepting this was forever.... The disease that was her mind.",
"I found a picture of myself sleeping on my phone, but strangely I live alone.",
"I’m gonna to turn my life around and start with a run tomorrow morning. Yes!",
"Hello, don’t mean to interrupt your reading, but I just wanted to say, You're beautiful.",
"Whatever comes, let it come. What stays, let it stay. What goes, let it go.",
"Revenge, justice, satisfaction...Mac had no interest in vocabulary games...this was going to stop.",
"When I fell she helped me up and now we are best friends for always!!",
"The ghost of you lingers silently in the shadows of my mind. I mourn thee.",
"She fell. Silent. Listening. Waiting. That moment felt like a millenia. And then, it began.",
"She breezed by, and my skin tingled. I could feel the flirtation in the air...",
"The problem with making friends on an anonymous website is that you're no longer anonymous.",
"You aren't hopeless, there is hope. You just need to see it, to feel it.",
"The sun shines right through her... Warming up her heart and melting her sadness away.",
"Born and grew happy as can be. Feeling being blessed to have been here. Yah!!!",
"To leave him stranded, his sombre silent friends will welcome him in the vast unknown.",
"Her scent was like freshly ground cinnamon and it matched her fiery yet sweet demeanour.",
"She came through unexpected an unknown variable! She left her marks! The ache is exquisite!",
"He was the most dangerous person she'd ever met, he made her heart want more.",
"This is the kind of bad mood you can have fun with, if you try.",
"The guild is small, but strong. Every battle ends in victory; death is not acceptable.",
"Sometimes I feel like I need to shatter these frozen walls and rearrange my reflection.",
"She stares out the dark window and waits for the sun to rise just once.",
"My boss, I know, needs desperately to be in therapy. Let’s out a bloodcurdling scream.",
"Sitting by the door he waits for her arrival, will it be chaos or calm.",
"Knowing that you both share the knowledge. Knowing nothing will ever come of it. Torture.",
"After she slapped his face, he threw her up against the wall and kissed her.",
"Her thoughts. Meandering. Lingering. A labyrinth. When did she lose herself? She no longer remembers.",
"If you have a dream of falling, night after night. What would you land on?",
"Suddenly, the world that once seemed small is growing now very large. You're already transparent.",
"Your intent shows through like black mold climbs. Our conversations are subtle attacks on her.",
"The brightness that shines upon your face is the light that I look to embrace.",
"There is a charm about the forbidden that tempts me and makes it unspeakably desirable.",
"Just to look deep into your eyes. Taste your lips and say I love you!",
"I started sleeping on your side. Last night I realized it was mine, all mine.",
"I am driftwood in a sea of love. Riding on waves bound to your shore.",
"I wish I can see your face last each night when I go to sleep.",
"I wish I can see your face first thing each morning when I wake up.",
"Concert tonight, Get the Led Out, gonna go nuts, smoking, drinking, carrying on!",
"They exchange glances, numbers, kisses, vows. They made love, promises, messes, excuses, up, a baby.",
"I am a monkey, you are a monkey, we are sitting in the tree. Chillin.",
"There are days she feels devoid of colour. Fading out. Oh, to be happy again.",
"I'm falling for you in a bottomless pit. Please catch me before I'm too distant.",
"Her winding road finally came to an abrupt end, So she couldn't turn back now.",
"As she slept her way to the top, she never noticed the wreckage left behind.",
"Dust topples the greatest of mountains into the sea for we are all cosmic debris.",
"Awake since yesterday. Couldn't go to sleep. My mind racing with thoughts. I miss you.",
"A thousand raindrops fell softly. I was the only one who ever heard their cries.",
"Building his identity on something fake, ended him in the world of countless closed doors.",
"Some days it really sucks that I only have two middle fingers to go around...",
"It is the little things you do that make me more in love with you.",
"If we were watching the sunset together, you would be the most beautiful view there.",
"Always smiles at me, cares not what I've done, shows me love anyway, my Granddaughter.",
"Stand against me. Call me different. Look down on me. Oppose me... This is motivation.",
"Young girl bleeds from wrists. Enveloped in a shroud of haunting memories. Nobody is watching.",
"I feel guilt everyday with you for not regretting meeting him.",
"Life chose to cripple me, I ruined what I had- now I have crippled myself...",
"It was over before it began, I will always blame myself for not saying hello.",
"I Love to spread Love Waves throughout the world, and fill it with Love, Amen!",
"You walked in with leaking take-out, movies, a smile, and the promise of better.",
"(If you know how) choose your words very carefully: you can control and manipulate anyone.",
"Her hands were tied, she couldn't breathe, the pain was pleasure, she found herself alive.",
"Drip. Drip. Drip. She sits, staring at the ceiling as the medication enters her bloodstream.",
"As I look into the bright light, I reach a sudden realization. I am home.",
"Hop out of one bed into another and change partners as often as your underwear.",
"Finding so much more beneath the surface, she smiled in excitement and sighed with relief.",
"Two hearts beat as one, one stops, one goes on like the other never existed!",
"I want to Love, jump, shout, run, dance, bless, play, sing, write, and to Love God!",
"He picked up the knife and followed her into the bathroom.",
"Your goodness stream the strength down your cheek and I cannot share in your empathy.")
word = 15
}
function s() {
lewp = 0;
document.getElementById('tmr').innerHTML="";
var level = "EASY MODE";
document.getElementById('txtlevel').innerHTML = level;
msg = new Array("I never said she stole my money.",
"Champ is real. Truely! I've seen him.",
"Apples fell out of his family tree...",
"A hand dug out of its grave.",
"And then she said, I dare you.",
"The green bubbling mess? Yeah, it’s mine...",
"I have way too much free time.",
"I learn that lesson once a year.",
"Shoot the monstrosity before he destroys us!",
"While trying to forget, you reminded me.",
"Hey look at her, you're so beautiful.",
"Life can't pause, so just hit play.",
"7 words, 3 numbers, 24 letters, right?",
"Nothing. Absolutely nothing, can stop him now.",
"Aliens, by the thousands, gathered before her.",
"The tolling church bells gong, It's over",
"Why won't this poetical vomit come out?",
"Overreaction - both a curse and a blessing.",
"Of course this is happening to me...",
"I really don't want to be here.",
"Thank you for brightening up my day.",
"I feel like I should help them.",
"How did you feel? My therapist asked.",
"It was the silence that haunted again.",
"Seven word stories are harder than you.",
"Yes, I know he is really dead.",
"Her fingers scraped the dresser, her mothers.",
"Who said I couldn't love a goldfish?",
"Doris Fintch - Age 103, best skydiver ever.",
"I understand, don't light schools on fire.",
"Last Words; Are you gonna eat that?",
"She still lies, she just got better.",
"Breathe in, breathe out, we move on.",
"My dog Sam died on Elm Street.",
"We used to be best friends forever.",
"With a piercing screech she swept away.",
"Her eyes said more than her mouth.",
"Candlelight flickered and lapped like a euphemism.",
"She lied. We knew what she meant.",
"It actually made her really sad. Really.",
"She scored, game won, goes home, celebrates.",
"Seed planted, watered, it grew, fruit harvested.",
"Cloudy day, nothing to do, adventure time.",
"Take one step forward, take two back.",
"Seven words is more to work with.",
"Just aimlessly wandering in the rain, mom.",
"I've been distracted by many a tease.",
"I promise I won't wait for you.",
"There's more to baking than just cakes!",
"You really need to stop lying now.",
"I told you, I am always right.",
"Now that that's over, who wants brownies?",
"I did tell you I was sorry...",
"These fairytale concoctions forgot to include her.",
"I wonder if people can fake smiles.",
"Insanity is something that's also called maniacness.",
"And then, I lunged for the toilet.",
"I want to- it's just, I can't.",
"Wishes only get the world so far.",
"She thought growing up meant not crying.",
"Images flash, yet the movie maker cringes.",
"Knowing he'll never see really does hurt.",
"Do you cry when it snows, too?",
"I need to find the lines, still.",
"I know now, you are my blizzard.",
"Please smile, it isn't really that hard.",
"Jumpy halfling dwarves pick quartz box below.",
"Schwarzkopf vexed Iraq big time in July.",
"Vex quest wizard, judge my backflop hand",
"The fox, zebra and my wolves quack.",
"Quest judge wizard bonks foxy chimp love",
"Phoenix was gazed by MTV for luck.",
"Five quacking zephyrs jolt my wax bed",
"The five champion boxing wizards jump quickly.",
"Few quips galvanized the mock jury box.",
"Both fickle dwarves jinx my pig quiz.",
"Fat hag dwarves quickly zap jinx mob.",
"Fox dwarves chop my talking quiz job.",
"Fickle jinx bog dwarves spy math quiz.",
"Public junk dwarves hug my quartz fox.",
"Quick fox jumps nightly above wizard harry.",
"Vexed nymphs go for quick waltz job",
"Sphinx of black quartz, judge my vow.",
"These fairytale concoctions forgot to include her.",
"Bright vixens jump while dozy fowl quack.",
"What is the point to spelling correctally?",
"Tears fell and, without words, I knew.",
"Nothing compares to the smile he wore.",
"She never expects answers when she asks.",
"Speak quickly, we only have seven words.",
"I won't trade because yours is better.",
"Count syllables, then you won't get lost.",
"I would've passed, except for parallel parking.",
"I really do care, what people think.",
"She loved him, he killed her anyway.",
"Smashed pumpkins are my new favorite puzzles.",
"You Are nothing short of completely hilarious.",
"Change? No, I'm not waiting for it.",
"Ducks can't fly then why the wings?",
"She woke up one morning in dead")
word = 7
}

function l() {
lewp = 1;
lvs = 5;
lvcntr = 0;
var level = "UNLIMITED MODE";
document.getElementById('txtlevel').innerHTML = level;
document.getElementById('nol').innerHTML="Completed levels: "+lvcntr+" : Lives left: "+lvs;
document.getElementById('tmr').innerHTML="";
msg = new Array("Tablets are the medium of the future.",
"Can you type this phrase rather quickly?",
"Is this sentence about you and me?",
"Many nannies of Persia quaintly read stories.",
"Everybody can type a 7 word sentence!",
"Wow! I am truly amazed by you!",
"Computers have changed lives for the better.",
"Please expound on your opinion this instant!",
"This is but a test of speed",
"I believe that you can type well!")
document.theForm.given.value = "";
document.theForm.typed.value = "";
word = 7
}

function beginIt() {
if (lewp==1){
myCounter.start();
randNum = Math.floor((Math.random()*10));
msgType = msg[randNum]
day = new Date();
startType = day.getTime();
document.theForm.given.value = msgType
document.theForm.typed.value = "";
document.theForm.typed.focus();
document.theForm.typed.select();
document.getElementById('nol').innerHTML="Completed levels: "+lvcntr+" : Lives left: "+lvs;
}
else if (lewp==0){
randNum = Math.floor((Math.random()*10));
msgType = msg[randNum]
day = new Date();
startType = day.getTime();
document.theForm.given.value = msgType
document.theForm.typed.value = "";
document.theForm.typed.focus();
document.theForm.typed.select();
}
}

function cheat() {
alert("You can not change that!");
document.theForm.typed.focus();
}

function stopIt() {

if (lewp==1){

if (lvs!==0){
if (document.theForm.typed.value !== document.theForm.given.value || document.theForm.typed.value == ""){
lvs=lvs-1;
beginIt();
}
else
lvcntr=lvcntr+1;
beginIt();
}
else if (lvs==0){
myCounter.stop();
window.location.href='#frm_result'
document.getElementById('txtresult').innerHTML = "Game over! you have completed "+lvcntr+" level(s) with "+lvs+" live(s) remaining!"
}

}

else {
	
	dayTwo = new Date();
	endType = dayTwo.getTime();
	totalTime = ((endType - startType) / 1000);
	
	spd = Math.round((word/totalTime) * 60);
		if (trim(document.theForm.typed.value) == document.theForm.given.value) {
			//alert("\nYou q-typed a " + word + " word sentence in " + totalTime + " seconds, a speed of about " + spd + " words per minute!");
			
			
			
			//save score to web sql
			addScore(spd,word,dayTwo.getTime(),Date.today().toString("d-MMM-yyyy"));
			
			window.location.href='#frm_result';
			document.getElementById('txtresult').innerHTML = "You q-typed a " + "<strong>" +word + "</strong>" +" word sentence in " + "<strong>" +totalTime + "</strong>" + " seconds, a speed of about " + "<strong>" +spd + "</strong>" + " words per minute!";
			document.theForm.typed.value = "";
			document.theForm.given.value = "";
			

			/*
			window.localStorage.setItem('timestamp', (new Date()));
			var dateandtime = window.localStorage.getItem('timestamp');
			
			window.localStorage.setItem('score', ("You q-typed a " + "<strong>" +word + "</strong>" +" word sentence in " + "<strong>" +totalTime + "</strong>" + " seconds, a speed of about " + "<strong>" +spd + "</strong>" + " words per minute!") );
			var topScore = window.localStorage.getItem('score');
			
			document.getElementById('txtlastresult').innerHTML = topScore + "<br><br>" + "Last" + " " + dateandtime + "<br><br>" + "View more results in the FULL VERSION"; 
			*/
			
		
		}
		
		else if(document.theForm.typed.value == "") {
			//alert("You did not q-type anything. Click Start Q-Typing Again.");
			window.location.href='#frm_result';
			document.getElementById('txtresult').innerHTML = "You did not q-type anything. Please try again.";
			document.theForm.typed.value = "";
			document.theForm.given.value = "";
		}
		
		else {

			var givenValues = document.theForm.given.value.split(" ");
			var typedValues = document.theForm.typed.value.split(" ");

			var goodWords = 0;
			var badWords = 0;

			var i = 0;
			for (var i = 0; i < word; i++)
			{
				if (typedValues.length > i) {
					var neededWord = givenValues[i];
					var typedWord = typedValues[i];
   
					if (typedWord != neededWord) {
						badWords +=1;
					}
					else
					{
						goodWords +=1;
					}
				}
  
				else
				{
					badWords += 1;
					} 
				}

		//alert("You made " + badWords + " error/s, but q-typed at a speed of " + spd + " words per minute.");
		window.location.href='#frm_result';
		document.getElementById('txtresult').innerHTML = "You made " + "<strong>" + badWords + "</strong>" + " error/s, but q-typed at a speed of " + "<strong>" + spd + "</strong>" + " words per minute!";
		document.theForm.typed.value = "";
		document.theForm.given.value = "";

   }
	
 }
 
 }
  
  
