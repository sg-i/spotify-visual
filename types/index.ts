export type SongDataType = {
    Track: string;
    'Album Name': string;
    Artist: string;
    'Release Date': string;    
    ISRC: string;
    'All Time Rank': string;
    'Track Score': string;
    'Spotify Streams': string;
    'Spotify Playlist Count': string;
    'Spotify Playlist Reach': string;
    'Spotify Popularity': string;
    'YouTube Views': string;
    'YouTube Likes': string;
    'TikTok Posts': string;
    'TikTok Likes': string;
    'TikTok Views': string;
    'YouTube Playlist Reach': string;
    'Apple Music Playlist Count': string;
    'AirPlay Spins': string;
    'SiriusXM Spins': string;
    'Deezer Playlist Count': string;
    'Deezer Playlist Reach': string;
    'Amazon Playlist Count': string;
    'Pandora Streams': string;
    'Pandora Track Stations': string;
    'Soundcloud Streams': string;
    'Shazam Counts': string;
    'TIDAL Popularity': string;
    'Explicit Track': string;
}

export type Node={
    id: number,
    x: number,
    y: number,
    "Track": string,
    "Spotify Streams": string
}