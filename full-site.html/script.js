"use strict";

/* ========================================
   PAGE ELEMENTS
======================================== */

// Header and navigation
const siteHeader = document.getElementById("siteHeader");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const primaryNavigation = document.getElementById("primaryNavigation");
const navigationLinks = document.querySelectorAll(".navigation-link");

// Builder steps
const colorStep = document.getElementById("color-step");
const engineStep = document.getElementById("engine-step");
const reviewStep = document.getElementById("review-step");

// Selection cards
const frameCards = document.querySelectorAll(".frame-card");
const colorCards = document.querySelectorAll(".color-card");
const engineCards = document.querySelectorAll(".engine-card");

// Step buttons
const continueToColorButton =
    document.getElementById("continueToColor");

const continueToEngineButton =
    document.getElementById("continueToEngine");

const reviewBuildButton =
    document.getElementById("reviewBuildButton");

const editBuildButton =
    document.getElementById("editBuildButton");

const requestBuildButton =
    document.getElementById("requestBuildButton");

// Custom-color fields
const customColorDetails =
    document.getElementById("customColorDetails");

const customColorRequest =
    document.getElementById("customColorRequest");

// Review fields
const reviewFrame = document.getElementById("reviewFrame");
const reviewColor = document.getElementById("reviewColor");
const reviewEngine = document.getElementById("reviewEngine");
const reviewTotal = document.getElementById("reviewTotal");

const reviewCustomColor =
    document.getElementById("reviewCustomColor");

const reviewCustomColorText =
    document.getElementById("reviewCustomColorText");

const reviewPriceNote =
    document.getElementById("reviewPriceNote");

//Review form

const buildRequestForm =
    document.getElementById("buildRequestForm");

const submittedFrame =
    document.getElementById("submittedFrame");

const submittedColor =
    document.getElementById("submittedColor");

const submittedEngine =
    document.getElementById("submittedEngine");

const submittedTotal =
    document.getElementById("submittedTotal");

const submittedCustomColor =
    document.getElementById("submittedCustomColor");

const reviewBikeImage =
    document.getElementById("reviewBikeImage");

const reviewPreviewMessage =
    document.getElementById("reviewPreviewMessage");

const framePreviewImages = {
    "Little Rascal": {
        Black: "Images/little-rascal-black.webp.png",
        Green: "Images/little-rascal-green.webp.png",
        Red: "Images/little-rascal-red.webp.png",
        Blue: "Images/little-rascal-blue.webp.png",
        Purple: "Images/little-rascal-purple.webp.png",
        Pink: "Images/little-rascal-pink.webp.png",
        "Custom Color": "Images/little-rascal.webp"
    },

    "Rascal Lite": {
        Black: "Images/rascal-lite-black.webp.png",
        Green: "Images/rascal-lite-green.webp.png",
        Red: "Images/rascal-lite-red.webp.png",
        Blue: "Images/rascal-lite-blue.webp.png",
        Purple: "Images/rascal-lite-purple.webp.png",
        Pink: "Images/rascal-lite-pink.webp.png",
        "Custom Color": "Images/rascal-lite.webp"
    },

    "Rascal Cruiser": {
        Black: "Images/rascal-cruiser-black.webp.png",
        Green: "Images/rascal-cruiser-green.webp.png",
        Red: "Images/rascal-cruiser-red.webp.png",
        Blue: "Images/rascal-cruiser-blue.webp.png",
        Purple: "Images/rascal-cruiser-purple.webp.png",
        Pink: "Images/rascal-cruiser-pink.webp.png",
        "Custom Color": "Images/rascal-cruiser.webp"
    },

    "Rascal GT Drag": {
        Black: "Images/rascal-gt-drag-black.webp.png",
        Green: "Images/rascal-gt-drag-green.webp.png",
        Red: "Images/rascal-gt-drag-red.webp.png",
        Blue: "Images/rascal-gt-drag-blue.webp.png",
        Purple: "Images/rascal-gt-drag-purple.webp.png",
        Pink: "Images/rascal-gt-drag-pink.webp.png",
        "Custom Color": "Images/rascal-gt-drag.webp"
    }
};
/* ========================================
   BUILD STATE
======================================== */

const buildSelection = {
    frame: {
        name: "",
        price: 0
    },

    color: {
        name: "",
        price: 0
    },

    engine: {
        name: "",
        price: 0
    }
};


/* ========================================
   GENERAL HELPER FUNCTIONS
======================================== */

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);
}


function calculateBuildTotal() {
    return (
        buildSelection.frame.price +
        buildSelection.color.price +
        buildSelection.engine.price
    );
}


function selectCard(selectedCard, cardCollection) {
    cardCollection.forEach((card) => {
        card.classList.remove("selected");
        card.setAttribute("aria-pressed", "false");
    });

    selectedCard.classList.add("selected");
    selectedCard.setAttribute("aria-pressed", "true");
}


function showAndScrollTo(section) {
    if (!section) {
        return;
    }

    section.classList.add("visible");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ========================================
   HEADER AND NAVIGATION
======================================== */

function updateHeaderOnScroll() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );
}


function toggleMobileMenu() {
    if (!primaryNavigation || !mobileMenuButton) {
        return;
    }

    const menuIsOpen =
        primaryNavigation.classList.toggle("open");

    mobileMenuButton.classList.toggle(
        "open",
        menuIsOpen
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
    );
}


function closeMobileMenu() {
    if (!primaryNavigation || !mobileMenuButton) {
        return;
    }

    primaryNavigation.classList.remove("open");
    mobileMenuButton.classList.remove("open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


function setActiveNavigationLink(selectedLink) {
    navigationLinks.forEach((link) => {
        link.classList.remove("active");
    });

    selectedLink.classList.add("active");
}


/* ========================================
   STEP 1 — FRAME SELECTION
======================================== */

frameCards.forEach((card) => {
    card.addEventListener("click", () => {
        selectCard(card, frameCards);

        buildSelection.frame.name =
            card.dataset.frame || "";

        buildSelection.frame.price =
            Number(card.dataset.price) || 0;

        if (continueToColorButton) {
            continueToColorButton.disabled = false;
        }
    });
});


if (continueToColorButton) {
    continueToColorButton.addEventListener("click", () => {
        if (!buildSelection.frame.name) {
            return;
        }

        showAndScrollTo(colorStep);
    });
}


/* ========================================
   STEP 2 — COLOR SELECTION
======================================== */

colorCards.forEach((card) => {
    card.addEventListener("click", () => {
        selectCard(card, colorCards);

        buildSelection.color.name =
            card.dataset.color || "";

        buildSelection.color.price =
            Number(card.dataset.price) || 0;

        if (customColorDetails) {
            const isCustomColor =
                buildSelection.color.name === "Custom Color";

            customColorDetails.classList.toggle(
                "visible",
                isCustomColor
            );
        }

        if (continueToEngineButton) {
            continueToEngineButton.disabled = false;
        }
    });
});


if (continueToEngineButton) {
    continueToEngineButton.addEventListener("click", () => {
        if (!buildSelection.color.name) {
            return;
        }

        showAndScrollTo(engineStep);
    });
}


/* ========================================
   STEP 3 — ENGINE SELECTION
======================================== */

engineCards.forEach((card) => {
    card.addEventListener("click", () => {
        selectCard(card, engineCards);

        buildSelection.engine.name =
            card.dataset.engine || "";

        buildSelection.engine.price =
            Number(card.dataset.price) || 0;

        if (reviewBuildButton) {
            reviewBuildButton.disabled = false;
        }
    });
});


/* ========================================
   REVIEW BUILD
======================================== */

function updateReviewSection() {
    const total = calculateBuildTotal();

    if (reviewFrame) {
        reviewFrame.textContent =
            buildSelection.frame.name || "Not Selected";
    }

    if (reviewColor) {
        reviewColor.textContent =
            buildSelection.color.name || "Not Selected";
    }

    if (reviewEngine) {
        reviewEngine.textContent =
            buildSelection.engine.name || "Not Selected";
    }

    if (reviewTotal) {
        reviewTotal.textContent =
            formatCurrency(total);
    }

    updateCustomColorReview();
    updateBikePreview();
}
function updateSubmissionFields() {
    const total = calculateBuildTotal();

    if (submittedFrame) {
        submittedFrame.value =
            buildSelection.frame.name;
    }

    if (submittedColor) {
        submittedColor.value =
            buildSelection.color.name;
    }

    if (submittedEngine) {
        submittedEngine.value =
            buildSelection.engine.name;
    }

    if (submittedTotal) {
        submittedTotal.value =
            formatCurrency(total);
    }

    if (submittedCustomColor) {
        const isCustomColor =
            buildSelection.color.name === "Custom Color";

        submittedCustomColor.value =
            isCustomColor
                ? customColorRequest?.value.trim() ||
                  "No details entered"
                : "Not applicable";
    }
}
function updateCustomColorReview() {
    if (
        !reviewCustomColor ||
        !reviewCustomColorText ||
        !reviewPriceNote
    ) {
        return;
    }

    const isCustomColor =
        buildSelection.color.name === "Custom Color";

    reviewCustomColor.hidden = !isCustomColor;

    if (isCustomColor) {
        const customRequest =
            customColorRequest?.value.trim() || "";

        reviewCustomColorText.textContent =
            customRequest ||
            "Custom finish details have not yet been entered.";

        reviewPriceNote.textContent =
            "The estimated total does not include the custom-color upgrade. Custom-color pricing is currently TBD and will be confirmed before the build begins.";
    } else {
        reviewPriceNote.textContent =
            "Taxes, delivery, custom fabrication, and final assembly charges may affect the final price.";
    }

}
if (reviewBuildButton) {
    reviewBuildButton.addEventListener("click", () => {
        const buildIsComplete =
            buildSelection.frame.name &&
            buildSelection.color.name &&
            buildSelection.engine.name;

        if (!buildIsComplete) {
            return;
        }

        updateReviewSection();
        updateSubmissionFields();
        showAndScrollTo(reviewStep);
    });
}

function updateBikePreview() {
    if (!reviewBikeImage || !reviewPreviewMessage) {
        return;
    }

    const selectedFrame = buildSelection.frame.name;
    const selectedColor = buildSelection.color.name;

    const frameImages = framePreviewImages[selectedFrame];
    const imagePath = frameImages?.[selectedColor];

    if (!selectedFrame || !selectedColor || !imagePath) {
        reviewBikeImage.removeAttribute("src");
        reviewBikeImage.hidden = true;
        reviewPreviewMessage.hidden = false;
        return;
    }

    reviewBikeImage.onload = () => {
        reviewBikeImage.hidden = false;
        reviewPreviewMessage.hidden = true;
    };

    reviewBikeImage.onerror = () => {
        console.error(
            "Could not load preview image:",
            imagePath
        );

        reviewBikeImage.hidden = true;
        reviewPreviewMessage.hidden = false;
    };

    reviewBikeImage.alt =
        `${selectedColor} ${selectedFrame} mini bike preview`;

    reviewBikeImage.src = imagePath;
}

/* ========================================
   EDIT AND REQUEST BUTTONS
======================================== */

if (editBuildButton) {
    editBuildButton.addEventListener("click", () => {
        showAndScrollTo(colorStep);
    });
}


if (buildRequestForm) {
    buildRequestForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        updateSubmissionFields();

        const originalButtonText =
            requestBuildButton.textContent;

        requestBuildButton.disabled = true;
        requestBuildButton.textContent =
            "Submitting Request...";

        const formData =
            new FormData(buildRequestForm);

        try {
            const response = await fetch(
                buildRequestForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "The request could not be submitted."
                );
            }

            requestBuildButton.textContent =
                "Request Submitted";

            alert(
                "Thank you! Your build request has been sent to Central Iowa Mini Motors."
            );
        } catch (error) {
            console.error(
                "Build request submission failed:",
                error
            );

            requestBuildButton.disabled = false;
            requestBuildButton.textContent =
                originalButtonText;

            alert(
                "Your request could not be submitted. Please check your information and try again."
            );
        }
    });
}


/* ========================================
   GLOBAL EVENT LISTENERS
======================================== */

window.addEventListener(
    "scroll",
    updateHeaderOnScroll
);


window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
        closeMobileMenu();
    }
});


if (mobileMenuButton) {
    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );
}


navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        setActiveNavigationLink(link);
        closeMobileMenu();
    });
});


/* ========================================
   INITIAL PAGE SETUP
======================================== */

updateHeaderOnScroll();