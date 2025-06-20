document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        moodButtons: document.querySelectorAll('.mood-btn'),
        quoteText: document.getElementById('quote-text'),
        quoteAuthor: document.getElementById('quote-author'),
        prevQuoteBtn: document.getElementById('prev-quote'),
        nextQuoteBtn: document.getElementById('next-quote'),
        bgMusic: document.getElementById('bg-music'),
        musicToggle: document.getElementById('music-toggle'),
        songTitle: document.getElementById('song-title'),
        songArtist: document.getElementById('song-artist'),
        progressBar: document.getElementById('progress-bar'),
        progressSlider: document.getElementById('progress-slider'),
        currentTimeDisplay: document.getElementById('current-time'),
        durationDisplay: document.getElementById('duration'),
        prevSongBtn: document.getElementById('prev-song'),
        nextSongBtn: document.getElementById('next-song'),
        volumeBtn: document.getElementById('volume-btn'),
        volumeSlider: document.getElementById('volume-slider'),
        particlesContainer: document.getElementById('particles'),
        bgBlur: document.querySelector('.bg-blur')
    };

    // Mood Configuration
    const moods = {
        happy: {
            quotes: [
                {text: "Happiness is the only purpose of life", author: "Rabindranath Tagore"},
                {text: "Being happy is the greatest success in life", author: "Kazi Nazrul Islam"},
                {text: "Joy is the simplest form of gratitude", author: "Karl Barth"},
                {text: "The happiness of your life depends upon the quality of your thoughts", author: "Marcus Aurelius"},
                {text: "Happiness is not something ready made. It comes from your own actions", author: "Dalai Lama"}
            ],
            songs: [
                {title: "Sugar", artist: "Maroon 5", file: "songs/happy/Sugar.mp3"},
                {title: "Senorita", artist: "Shawn Mendes & Camila Cabello", file: "songs/happy/Senorita.mp3"},
                {title: "Amen", artist: "Fossils", file: "songs/happy/Amen.mp3"}
            ],
            emojis: ["🌟", "🎉", "😊", "🎈", "🌈", "☀️", "✨"],
            bgImage: "assets/images/bg-happy.jpg"
        },
        sad: {
            quotes: [
                {text: "Sadness comes so we can understand the real value of life", author: "Swami Vivekananda"},
                {text: "Tears speak the truest words of the heart", author: "Michael Madhusudan Dutt"},
                {text: "The wound is the place where the Light enters you", author: "Rumi"},
                {text: "Sadness flies away on the wings of time", author: "Jean de La Fontaine"},
                {text: "There must be a dark side to everything for the whole to be complete", author: "Carl Jung"}
            ],
            songs: [
                {title: "Let Me Down Slowly", artist: "Alec Benjamin", file: "songs/sad/Let-me-down.mp3"},
                {title: "Tum Hi Ho", artist: "Arijit Singh", file: "songs/sad/tum_hi_ho.mp3"},
                {title: "Dyakho Manoshi", artist: "Fossils", file: "songs/sad/dekho-manoshi.mp3"}
            ],
            emojis: ["💧", "☔", "🌧️", "😢", "🌫️", "🌨️", "🕊️"],
            bgImage: "assets/images/bg-sad.jpg"
        },
        angry: {
            quotes: [
                {text: "Anger is a poison that one drinks himself", author: "Gautam Buddha"},
                {text: "Staying calm is the greatest strength", author: "Mahatma Gandhi"},
                {text: "For every minute you remain angry, you give up sixty seconds of peace", author: "Ralph Waldo Emerson"},
                {text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured", author: "Mark Twain"},
                {text: "Speak when you are angry and you will make the best speech you will ever regret", author: "Ambrose Bierce"}
            ],
            songs: [
                {title: "Break Stuff", artist: "Limp Bizkit", file: "songs/angry/break_stuff.mp3"},
                {title: "Sadda Haq", artist: "Mohit Chauhan", file: "songs/angry/rockstar.mp3"},
                {title: "Bishakto Manush", artist: "Fossils", file: "songs/angry/bishakto.mp3"}
            ],
            emojis: ["💢", "🔥", "⚡", "😡", "👊", "💥", "🗯️"],
            bgImage: "assets/images/bg-angry.jpg"
        },
        love: {
            quotes: [
                {text: "Love is one soul living in two bodies", author: "Aristotle"},
                {text: "Love is the only truth of life", author: "Bankim Chandra Chattopadhyay"},
                {text: "Where there is love there is life", author: "Mahatma Gandhi"},
                {text: "The best thing to hold onto in life is each other", author: "Audrey Hepburn"},
                {text: "Love is composed of a single soul inhabiting two bodies", author: "Aristotle"}
            ],
            songs: [
                {title: "Shape of You", artist: "Ed Sheeran", file: "songs/love/shape.mp3"},
                {title: "Tujh Mein Rab Dikhta Hai", artist: "Roop Kumar Rathod", file: "songs/love/rabne.mp3"},
                {title: "Aro Ekbaar", artist: "Fossils", file: "songs/love/aroakbar.mp3"}
            ],
            emojis: ["❤️", "💘", "😍", "🌹", "💌", "💑", "💞"],
            bgImage: "assets/images/bg-love.jpg"
        },
        neutral: {
            quotes: [
                {text: "The place to find peace is in the present moment", author: "Thich Nhat Hanh"},
                {text: "An ordinary life is the most extraordinary life", author: "Lao Tzu"},
                {text: "Calm mind brings inner strength and self-confidence", author: "Dalai Lama"},
                {text: "Peace comes from within. Do not seek it without", author: "Buddha"},
                {text: "The present moment is filled with joy and happiness. If you are attentive, you will see it", author: "Thich Nhat Hanh"}
            ],
            songs: [
                {title: "Budapest", artist: "George Ezra", file: "songs/neutral/budapest.mp3"},
                {title: "Ilahi", artist: "Pritam", file: "songs/neutral/ilahi.mp3"},
                {title: "Chador", artist: "Fossils", file: "songs/neutral/chador.mp3"}
            ],
            emojis: ["☁️", "🍃", "😐", "🌿", "🌀", "🌫️", "🌌"],
            bgImage: "assets/images/bg-neutral.jpg"
        }
    };

    // App State
    const state = {
        currentMood: null,
        currentSongIndex: 0,
        currentQuoteIndex: 0,
        isMusicPlaying: false,
        particleInterval: null,
        quoteInterval: null,
        isDraggingProgress: false,
        isVolumeMuted: false,
        lastVolume: 70
    };

    // Initialize App
    function init() {
        const savedMood = localStorage.getItem('moodMirrorMood') || 'neutral';
        setMood(savedMood);
        setupEventListeners();
        
        // Set initial active button
        elements.moodButtons.forEach(btn => {
            if (btn.dataset.mood === savedMood) {
                btn.classList.add('active');
            }
        });

        // Set initial volume
        elements.bgMusic.volume = 0.7;
    }

    // Set Up Event Listeners
    function setupEventListeners() {
        // Mood buttons
        elements.moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.dataset.mood;
                setMood(mood);
                localStorage.setItem('moodMirrorMood', mood);
                
                // Update active button
                elements.moodButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Quote navigation
        elements.prevQuoteBtn.addEventListener('click', showPreviousQuote);
        elements.nextQuoteBtn.addEventListener('click', showNextQuote);

        // Music controls
        elements.musicToggle.addEventListener('click', toggleMusic);
        elements.prevSongBtn.addEventListener('click', playPreviousSong);
        elements.nextSongBtn.addEventListener('click', playNextSong);
        
        // Progress slider
        elements.progressSlider.addEventListener('input', () => {
            const seekTime = (elements.progressSlider.value / 100) * elements.bgMusic.duration;
            elements.bgMusic.currentTime = seekTime;
        });
        
        elements.progressSlider.addEventListener('mousedown', () => {
            state.isDraggingProgress = true;
        });
        
        elements.progressSlider.addEventListener('mouseup', () => {
            state.isDraggingProgress = false;
        });
        
        // Volume controls
        elements.volumeSlider.addEventListener('input', () => {
            const volume = elements.volumeSlider.value / 100;
            elements.bgMusic.volume = volume;
            
            if (volume === 0) {
                state.isVolumeMuted = true;
                elements.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                state.isVolumeMuted = false;
                elements.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                state.lastVolume = elements.volumeSlider.value;
            }
        });
        
        elements.volumeBtn.addEventListener('click', toggleMute);
        
        // Audio events
        elements.bgMusic.addEventListener('timeupdate', updateProgressBar);
        elements.bgMusic.addEventListener('ended', playNextSong);
        elements.bgMusic.addEventListener('loadedmetadata', updateDurationDisplay);
        
        // Clear intervals when page unloads
        window.addEventListener('beforeunload', () => {
            if (state.particleInterval) clearInterval(state.particleInterval);
            if (state.quoteInterval) clearInterval(state.quoteInterval);
        });
    }

    // Set Mood Function
    function setMood(mood) {
        if (!moods[mood]) return;
        
        // Clear previous intervals
        if (state.particleInterval) clearInterval(state.particleInterval);
        if (state.quoteInterval) clearInterval(state.quoteInterval);
        
        state.currentMood = mood;
        state.currentSongIndex = 0;
        state.currentQuoteIndex = 0;
        
        // Update UI
        document.body.className = mood;
        updateQuote(mood);
        updateBackground(mood);
        createParticles(mood);
        playCurrentSong();
        
        // Set up auto-changing quotes every 15 seconds
        state.quoteInterval = setInterval(() => {
            showNextQuote();
        }, 15000);
    }

    // Quote Navigation
    function showNextQuote() {
        const quotes = moods[state.currentMood].quotes;
        state.currentQuoteIndex = (state.currentQuoteIndex + 1) % quotes.length;
        updateQuote(state.currentMood);
    }

    function showPreviousQuote() {
        const quotes = moods[state.currentMood].quotes;
        state.currentQuoteIndex = (state.currentQuoteIndex - 1 + quotes.length) % quotes.length;
        updateQuote(state.currentMood);
    }

    // Update Quote
    function updateQuote(mood) {
        const quotes = moods[mood].quotes;
        const quote = quotes[state.currentQuoteIndex];
        elements.quoteText.textContent = `"${quote.text}"`;
        elements.quoteAuthor.textContent = `- ${quote.author}`;
        
        // Add fade animation
        elements.quoteText.style.animation = 'fadeIn 0.5s';
        elements.quoteAuthor.style.animation = 'fadeIn 0.5s';
        
        // Reset animation after it completes
        setTimeout(() => {
            elements.quoteText.style.animation = '';
            elements.quoteAuthor.style.animation = '';
        }, 500);
    }

    // Update Background
    function updateBackground(mood) {
        elements.bgBlur.style.backgroundImage = `url(${moods[mood].bgImage})`;
    }

    // Create Floating Particles
    function createParticles(mood) {
        // Clear previous particles
        elements.particlesContainer.innerHTML = '';
        
        // Create new particles
        state.particleInterval = setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random emoji from current mood
            const emojis = moods[mood].emojis;
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random position and animation
            const startPosX = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            const size = Math.random() * 20 + 10;
            
            particle.style.left = `${startPosX}%`;
            particle.style.top = `110%`;
            particle.style.fontSize = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            elements.particlesContainer.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 500);
    }

    // Music Controls
    function playCurrentSong() {
        const songs = moods[state.currentMood].songs;
        if (!songs || songs.length === 0) return;
        
        const song = songs[state.currentSongIndex];
        elements.bgMusic.src = song.file;
        elements.songTitle.textContent = song.title;
        elements.songArtist.textContent = song.artist;
        
        if (state.isMusicPlaying) {
            elements.bgMusic.play()
                .then(() => {
                    elements.musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(e => console.log("Autoplay prevented:", e));
        }
    }

    function playNextSong() {
        const songs = moods[state.currentMood].songs;
        state.currentSongIndex = (state.currentSongIndex + 1) % songs.length;
        playCurrentSong();
    }

    function playPreviousSong() {
        const songs = moods[state.currentMood].songs;
        state.currentSongIndex = (state.currentSongIndex - 1 + songs.length) % songs.length;
        playCurrentSong();
    }

    function toggleMusic() {
        state.isMusicPlaying = !state.isMusicPlaying;
        
        if (state.isMusicPlaying) {
            elements.bgMusic.play()
                .then(() => {
                    elements.musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(e => console.log("Playback failed:", e));
        } else {
            elements.bgMusic.pause();
            elements.musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function toggleMute() {
        state.isVolumeMuted = !state.isVolumeMuted;
        
        if (state.isVolumeMuted) {
            state.lastVolume = elements.volumeSlider.value;
            elements.bgMusic.volume = 0;
            elements.volumeSlider.value = 0;
            elements.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            elements.bgMusic.volume = state.lastVolume / 100;
            elements.volumeSlider.value = state.lastVolume;
            elements.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    function updateProgressBar() {
        const { duration, currentTime } = elements.bgMusic;
        if (duration && !state.isDraggingProgress) {
            const progressPercent = (currentTime / duration) * 100;
            elements.progressBar.style.width = `${progressPercent}%`;
            elements.progressSlider.value = progressPercent;
            
            // Update current time display
            elements.currentTimeDisplay.textContent = formatTime(currentTime);
        }
    }

    function updateDurationDisplay() {
        const duration = elements.bgMusic.duration;
        if (duration) {
            elements.durationDisplay.textContent = formatTime(duration);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Initialize the app
    init();
});