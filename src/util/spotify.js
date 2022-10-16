
const clientId ="654b42c2899f47cda46aa5f42193437e";
const redirectUri = "http://localhost:3000/"; //must add this to spotify redirect URI on the spotify URI
let accessToken;

 const spotify ={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        // ^&*- redux expression- get into the URL and extract the token information from it, hence the button-match is pushed here. 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInmatch = windows.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInmatch){
            accessToken=accessTokenMatch[1];
            const expiresIn=Number(expiresInmatch[1]);
            window.setTimeout(()=>(accessToken=""), expiresIn*1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }else{
            //URL that get generated in the browse 
            const accessURL="https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_url=${redirectUrl}";
            window.location=accessURL;
        }
    },
        search(term){
            const accessToken = spotify.getAccessToken();
            return fetch("https://api.spotify.com/v1/search?type=track&g=${term)",{
                headers:{
                    Authorization: 'Bearer ${accessToken}'
                }
            }).then(response=>{
                return response.json();
            })
            .then(jsonResponse =>{
                return response.json();
            })
            .then(jsonResponse =>{
                if(!jsonResponse.tracks){
                    return[];
                }
                return jsonResponse.tracks.items.map(track=>({
                    // temporary json object
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            })
        },
        savePlaylist(name, trackUris){
            if(!name || !trackUris.length){
                return;
            }
            const accessToken = spotify.getAccessToken();
            const headers={Authorization: 'Bearer ${accessToken}'};
            let userId;

            return fetch("https://spotify.com/v1/me",{headers:headers})
            .then(response => response.json())
            .then(jsonResponse =>{
                userId = jsonResponse.id;
                return fetch("https://spotify.com/v1/users/${usersId}/playlist", {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({name:name})
                })
                .then(response => response.json())
                .then(jsonResponse =>{
                    const playlistId = jsonResponse.id;
                    return fetch(
                        "https://api.spotify.com/v1/users/${usersid}/playlists/&{playlistId}/tracks",
                        {
                            headers:headers,
                            method: "POST",
                            body: JSON.stringify({uris:trackUris})
                        }
                    );
                });
            });
        }
};

export default spotify;
