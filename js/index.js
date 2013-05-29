var db;
var html;
var easy = [];
var medium = [];
var hard = [];
db = openDatabase('qtt', '1.0', 'A Kamote Empire Inc', 2 * 1024 * 1024); 

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
var level = "NOVICE MODE";
document.getElementById('txtlevel').innerHTML = level;
msg = new Array("Practicing your q-typing can greatly help your overall mobile skills.",
"A new q-device is sold in the world every hour!",
"When do birds migrate from North to South?",
"His irascible sense of humor endeared him to everyone else.",
"I felt a bit conspicious wearing a tuxedo to school.",
"Someone suffering from celiac syndrome is unable to digest wheat!",
"As always, because we were destitute, we had no choice!",
"He was so adept at his job of q-typing phrases.",
"We truly can't expound this diminutive sentence for more difficulty.",
"Strenuous phrases, like this one, are tough to type.")
word = 10
}
function e() {
var level = "HARD MODE";
document.getElementById('txtlevel').innerHTML = level;
msg = new Array("If you can correctly, and quickly, type this strenuous sentence, you are one exquisite q-typist!",
"You are one exquisite q-typist if you can correctly, and quickly, type this long phrase.",
"I believe you're a good q-typist, so I believe you will correctly copy this statement!",
"In a wonderful day at the zoo, we saw lions, tigers, bears and exotic birds.",
"We had cold milk, ham, bread, butter, corn, peas and carrots for dinner last night.",
"The activities at summer camp will include tennis, swimming, basketball, soccer, hiking, baseball and archery.",
"Some people like to have their fore licked while others like to have their afflict!",
"The only way to type faster is to do it yourself, and learn from mistakes.",
"Varying your techniques is for trial and error, but don't forget to practice a lot!",
"Because this is not a fairly simple phrase, could you swiftly, and precisely, copy it?")
word = 15
}
function s() {
var level = "EASY MODE";
document.getElementById('txtlevel').innerHTML = level;
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
word = 7
}



function beginIt() {
randNum = Math.floor((Math.random()*10));
msgType = msg[randNum]
day = new Date();
startType = day.getTime();
document.theForm.given.value = msgType
document.theForm.typed.value = "";
document.theForm.typed.focus();
document.theForm.typed.select();
}
function cheat() {
alert("You can not change that!");
document.theForm.typed.focus();
}
function stopIt() {


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
  
  
