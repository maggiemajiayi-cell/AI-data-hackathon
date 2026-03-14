import { useCallback, useEffect, useRef, useState } from "react";

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => Promise<string>;
  resetTranscript: () => void;
  isSupported: boolean;
}

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const transcriptRef = useRef<string>("");
  const interimTranscriptRef = useRef<string>("");

  useEffect(() => {
    // Check browser support for Web Speech API
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setError("Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari on iOS.");
      return;
    }

    try {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
        transcriptRef.current = "";
        interimTranscriptRef.current = "";
      };

      recognitionRef.current.onresult = (event: any) => {
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            transcriptRef.current += transcriptSegment + " ";
            setTranscript(transcriptRef.current.trim());
          } else {
            interim += transcriptSegment;
          }
        }

        interimTranscriptRef.current = interim;
        setInterimTranscript(interim);
      };

      recognitionRef.current.onerror = (event: any) => {
        let errorMsg = `Speech recognition error: ${event.error}`;

        // Provide helpful error messages
        if (event.error === "no-speech") {
          errorMsg = "No speech detected. Please try again and speak clearly.";
        } else if (event.error === "network") {
          errorMsg = "Network error. Please check your internet connection.";
        } else if (event.error === "not-allowed") {
          errorMsg = "Microphone access denied. Please allow microphone permissions.";
        }

        setError(errorMsg);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to initialize speech recognition";
      setError(errorMsg);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError("Speech recognition not initialized");
      return;
    }

    if (!isListening) {
      try {
        transcriptRef.current = "";
        interimTranscriptRef.current = "";
        setTranscript("");
        setInterimTranscript("");
        setError(null);
        recognitionRef.current.start();
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to start listening";
        setError(errorMsg);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(async (): Promise<string> => {
    return new Promise((resolve) => {
      if (recognitionRef.current) {
        // Set a timeout to ensure we return the transcript even if event doesn't fire
        const timeoutId = setTimeout(() => {
          const finalStr = (transcriptRef.current + " " + interimTranscriptRef.current).trim();
          resolve(finalStr);
        }, 300);

        const onEndHandler = () => {
          clearTimeout(timeoutId);
          recognitionRef.current?.removeEventListener("end", onEndHandler);
          const finalStr = (transcriptRef.current + " " + interimTranscriptRef.current).trim();
          resolve(finalStr);
        };

        recognitionRef.current.addEventListener("end", onEndHandler);

        try {
          recognitionRef.current.stop();
        } catch (err) {
          clearTimeout(timeoutId);
          const errorMsg = err instanceof Error ? err.message : "Failed to stop listening";
          setError(errorMsg);
          const finalStr = (transcriptRef.current + " " + interimTranscriptRef.current).trim();
          resolve(finalStr);
        }
      } else {
        const finalStr = (transcriptRef.current + " " + interimTranscriptRef.current).trim();
        resolve(finalStr);
      }
    });
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    interimTranscriptRef.current = "";
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
}

