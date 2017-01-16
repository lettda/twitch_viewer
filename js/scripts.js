$(document).ready(() => {

  let followerNames = [];

    $.ajax({
    type: 'GET',
    url: "https://api.twitch.tv/kraken/users/SCKADOOSH/follows/channels",
    headers: {
       'Client-ID': 'drj8nyih5rn8z2go1x0fgga6dmudwx'
    },
    success: (data2) => {

        for (var i = 0; i < data2.follows.length; i++) {  //check number of folowers user has
          const usersCurrentFollowers = data2.follows[i]; //check the array and get the channel names of followers
          followerNames.push(usersCurrentFollowers.channel.display_name); //push that channel name into an array of user's followers
        }
    }
  });

  console.log(followerNames); 

for (var j = 0; j < followerNames.length; j++) { //iterate over the array of follower names

	followerNames[j] = function () { //function to call the ajax request on each channel the user follows

		$.ajax({
 		type: 'GET',
 		url:  'https://api.twitch.tv/kraken/streams/'+[j],
 		headers: {
  		 'Client-ID': 'drj8nyih5rn8z2go1x0fgga6dmudwx'
 		},
 		success: (data) => {  
   			// console.log(data);

   			let streamStatus = data.stream; //status of the users stream offline/online
   			// console.log(channelUrl);

   			if (streamStatus === null) { //check if streaming or not....if not streaming
   				const offlineChannelLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/User-offline.svg/1024px-User-offline.svg.png"; //placeholder logo for offline streamer
   				$("#status").append("<h3> Offline </h3>") //set status to offline
   				$("#logo").append("<img class='streamerLogo' src='" + offlineChannelLogo + "'/>"); //logo to placeholder logo
   				$("#streamerName").append("<h3>User Offline</h3>"); //set current stream/game to 'User Offline'

   			} else { //if currently online streaming
   				const channelLogo = data.stream.channel.logo; //get channel logo
   				const streamerName = data.stream.channel.display_name; //get streamer name
          const streamLink = "https://www.twitch.tv/"+streamerName; //get link to streamers schannel
   				$("#status").append("<h3><a href=" + streamLink +">" + streamStatus.game + "</a></h3>") //display game currently streaming on channel
   				$("#logo").append("<img class='streamerLogo' src='" + channelLogo + "'/>"); //display channel logo
   				$("#streamerName").append("<h3>"+ streamerName+"</h3>"); //display streamer name
   			}
 		}
		});
   }
	}
});