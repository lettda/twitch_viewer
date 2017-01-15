// $(document).ready(function() {
// 	$.getJSON("https://api.twitch.tv/kraken/streams/freecodecamp?callback=?", function(data) {
//   		console.log(data);
// 	});
// });

$(document).ready(() => {

	let url = ['https://api.twitch.tv/kraken/streams/sodapoppin','https://api.twitch.tv/kraken/streams/sing_sing','https://api.twitch.tv/kraken/streams/freecodecamp'];
	function myAjaxRequest(myUrl) {
		$.ajax({
 		type: 'GET',
 		url: myUrl,
 		headers: {
  		 'Client-ID': 'drj8nyih5rn8z2go1x0fgga6dmudwx'
 		},
 		success: (data) => {
   			console.log(data);

   			let streamStatus = data.stream;
   			console.log(streamStatus);

   			if (streamStatus === null) {
   				const offlineChannelLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/User-offline.svg/1024px-User-offline.svg.png";
   				$("#status").append("<h3> Offline </h3>")
   				$("#logo").append("<img class='streamerLogo' src='" + offlineChannelLogo + "'/>");
   				$("#streamerName").append("<h3>freecodecamp</h3>");

   			} else {
   				const channelLogo = data.stream.channel.logo;
   				const streamerName = data.stream.channel.display_name;
          const streamLink = "https://www.twitch.tv/"+streamerName;
   				$("#status").append("<h3><a href=" + streamLink +">" + streamStatus.game + "</a></h3>")
   				$("#logo").append("<img class='streamerLogo' src='" + channelLogo + "'/>");
   				$("#streamerName").append("<h3>"+ streamerName+"</h3>");
   			}
 		}
		});
	}

		$.ajax({
 		type: 'GET',
 		url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
 		headers: {
  		 'Client-ID': 'drj8nyih5rn8z2go1x0fgga6dmudwx'
 		},
		success: (data2) => {
   			// console.log(data2);
		}
	});
	myAjaxRequest(url[0]);
	myAjaxRequest(url[1]);
  myAjaxRequest(url[2]);
});