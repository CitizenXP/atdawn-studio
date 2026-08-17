/*
	At Dawn Studio: deployment configuration
	=========================================
	This is the ONLY file you need to edit when deploying.

	adminPasswordHash:
		SHA-256 hex of the producer/admin password.
		The default password is:  atdawn2026
		To change it, open admin.html -> Settings -> "Change admin password",
		which generates the new hash for you to paste below.

	vdoPath:
		Path from the /studio/ folder to the VDO.Ninja install.
		"../" is correct when /studio/ lives inside the VDO.Ninja web root.
		You may also use an absolute URL (e.g. "https://vdo.yourdomain.com/").
*/
window.STUDIO_CONFIG = {
	brandName: "At Dawn Studio",
	tagline: "Remote Guest Green Room & Broadcast Control",
	vdoPath: "../",

	// SHA-256 of the admin password (set via admin.html -> Settings -> "Change admin password")
	adminPasswordHash: "2756913f66f6be6dc8152d971f1c9e7e7a99b9f77407c7f584b13c151993996d",

	// Defaults used the first time the dashboard runs (editable in Settings).
	// Leave the room fields empty: the dashboard then generates unguessable random
	// room names and a random password on first run. This matters because this file
	// is public if you host the repo publicly (which the AGPL license encourages).
	defaults: {
		eventName: "At Dawn Live",
		greenRoom: "",   // "" = auto-generate a random, unguessable room id
		mainRoom: "",    // "" = auto-generate
		roomPassword: "", // "" = auto-generate; shared by both rooms (needed for transfers)
		requirePasswordEntry: false // if true, guests must type the room password to join
	}
};
