
// Call variables
const navbar = document.querySelector(".navbar");
const itemHover = document.querySelectorAll(".items");


let themed = 1;
function themeAdjust() {
    // For home 
    //also nasa home.js ang content variable
    themed += 1;

    const banner = document.querySelector(".banner");
    const endGame = document.querySelector(".endgame");
    const mole = document.querySelector(".mole-container");
    const snakeSign = document.querySelector(".snake-container");
    const countdown = document.querySelector(".countdown");
    const ticTacToe = document.querySelector(".tikTakToe-container");
    
    const history = document.querySelector(".history-content");


    switch (themed) {
        case 1:
            // Light
            navbar.style.background = "var(--nav-color-default)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', 'rgba(174, 0, 255, 0.466)')
            });
            content.style.background = "var(--content-color-default)";

            if(countdown !== null) {
                countdown.style.color = "#000"
            }
            
        break;
        case 2:
            // Dark
            navbar.style.background = "var(--nav-color-dark)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', '#b59e55');
            });
            content.style.background = "var(--content-color-dark)";

            if(countdown !== null) {
                countdown.style.color = "#fff"
            }

        break;
        case 3:
            // Rose
            navbar.style.background = "var(--nav-color-rose)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', '#e49b9b')
            });
            content.style.background = "var(--content-color-rose)";

            if(countdown !== null) {
                countdown.style.color = "#000"
            }

            themed = 0;
        break;
    }

    if (banner !== null) themeFillHome()
    if (mole !== null) themeFillMole()
    if (snakeSign !== null) themeFillSnake();
    if (endGame !== null) themeFillEnd();
    if (ticTacToe !== null) themeFillTicTacToe();
    if (history !== null) themeFillHistory();
}

function themeOnload() {
    const banner = document.querySelector(".banner");
    const highlight = document.querySelector(".highlight");
    const message = document.querySelector(".message");

    banner.style.background = "var(--banner-color)";
    banner.style.borderColor = "var(--border-color)";
    highlight.style.color = "var(--highlight-color)";
    message.style.color = "var(--message-color)";
}

window.onload = themeOnload();

function themeFillEnd() {
    const endGameMain = document.querySelector(".endgame-main");
    switch (themed) {
        case 1:
            // Light
            endGameMain.style.color = "var(--mole-bannerText-default)";
            endGameMain.style.backgroundColor = "var(--mole-banner-default)";
            endGameMain.style.borderColor = "var(--mole-bannerBorder-default)";
        break;
        case 2:
            // Dark
            endGameMain.style.color = "var(--mole-bannerText-dark)";
            endGameMain.style.backgroundColor = "var(--mole-banner-dark)";
            endGameMain.style.borderColor = "var(--mole-bannerBorder-dark)";
        break;
        case 0:
            // Rose
            endGameMain.style.color = "var(--mole-bannerText-rose)";
            endGameMain.style.backgroundColor = "var(--mole-banner-rose)";
            endGameMain.style.borderColor = "var(--mole-bannerBorder-rose)";
        break;
    }
}

function themeFillHome() {
    const banner = document.querySelector(".banner");
    const highlight = document.querySelector(".highlight");
    const message = document.querySelector(".message");
    switch (themed) {
        case 1:
            // Light
            banner.style.background = "var(--banner-color)";
            banner.style.borderColor = "var(--border-color)";
            highlight.style.color = "var(--highlight-color)";
            message.style.color = "var(--message-color)";
        break;
        case 2:
            // Dark
            banner.style.background = "var(--banner-color-dark)";
            banner.style.borderColor = "var(--border-color-dark)";
            highlight.style.color = "var(--highlight-color-dark)";
            message.style.color = "var(--message-color-dark)";
        break;

        /*The reason kung bakit 0 pag sa rose theme na ay
        para ma adjust natin sa case 3 ng theme adjust. Dahil ginagawang 0 yung 
        value ni themed sa case 3 nila don*/
        case 0:
            banner.style.background = "var(--banner-color-rose)";
            banner.style.borderColor = "var(--border-color-rose)";
            highlight.style.color = "var(--highlight-color-rose)";
            message.style.color = "var(--message-color-rose)";
        break;
    }
}

// Yung countdown lagay mo rin tsaka dapat kada end state may if statement para gumana
function themeFillMole() {
    // Background Color
    const moleBanner = document.querySelector(".mole-banner");
    const moleButton = document.querySelectorAll(".mole-button");
    const moleHole = document.querySelectorAll(".mole-hole");

    const countdown = document.querySelector(".countdown");

    // Texts
    const moleDifficulty = document.querySelector(".mole-difficulty")
    const moleTimeLimit = document.querySelector(".mole-timeLimit")
    const moleTimeDiv = document.querySelector(".mole-time-div");
    const moleScoreDiv = document.querySelector(".mole-score-div");
    switch (themed) {
        case 1:
            if (moleBanner !== null) {
                //Light
                moleBanner.style.backgroundColor = "var(--mole-banner-default)";
                moleBanner.style.color = "var(--mole-bannerText-default)"
                moleBanner.style.borderColor = "var(--mole-bannerBorder-default)";

                moleButton.forEach(items => {
                    items.style.backgroundColor = "var(--mole-button-default)";
                });

                moleDifficulty.style.color = "var(--mole-text-default)";
                moleTimeLimit.style.color = "var(--mole-text-default)";

                if(countdown !== null) {
                    countdown.style.color = "var(--mole-text-default)"
                }
            }

            if (moleTimeDiv !== null) {

                moleHole.forEach(items => {
                    items.style.backgroundColor = "var(--mole-hole-default)";
                });

                moleTimeDiv.style.color = "var(--mole-text-default)";
                moleScoreDiv.style.color = "var(--mole-text-default)";
            }

            
            
        break;

        case 2:
            if (moleBanner !== null) {
                //Dark
                moleBanner.style.backgroundColor = "var(--mole-banner-dark)";
                moleBanner.style.color = "var(--mole-bannerText-dark)";
                moleBanner.style.borderColor = "var(--mole-bannerBorder-dark)";

                moleButton.forEach(items => {
                    items.style.backgroundColor = "var(--mole-button-dark)";
                });

                moleDifficulty.style.color = "var(--mole-text-dark)";
                moleTimeLimit.style.color = "var(--mole-text-dark)";

                if(countdown !== null) {
                    countdown.style.color = "var(--mole-text-dark)"
                }
                
            }

            if (moleTimeDiv !== null) {

                moleHole.forEach(items => {
                    items.style.backgroundColor = "var(--mole-hole-dark)";
                });

                moleTimeDiv.style.color = "var(--mole-text-dark)";
                moleScoreDiv.style.color = "var(--mole-text-dark)";
            }
            
        break;

        case 0:
            // Rose
            if (moleBanner !== null) {
                moleBanner.style.backgroundColor = "var(--mole-banner-rose)";
                moleBanner.style.color = "var(--mole-bannerText-rose)";
                moleBanner.style.borderColor = "var(--mole-bannerBorder-rose)";

                moleButton.forEach(items => {
                    items.style.backgroundColor = "var(--mole-button-rose)";
                });

                moleDifficulty.style.color = "var(--mole-text-rose)";
                moleTimeLimit.style.color = "var(--mole-text-rose)";   

                if(countdown !== null) {
                    countdown.style.color = "var(--mole-text-rose)"
                }
            }

            if (moleTimeDiv !== null) {
                moleHole.forEach(items => {
                    items.style.backgroundColor = "var(--mole-hole-rose)";
                });

                moleTimeDiv.style.color = "var(--mole-text-rose)";
                moleScoreDiv.style.color = "var(--mole-text-rose)";
            }
        break;
    }
}

function themeFillSnake() {
    const snakeBanner = document.querySelector(".snake-banner");
    const message = document.querySelector(".snake-message p")
    const snakeCage = document.querySelector(".snake-cage");
    const statsSnake = document.querySelector(".stat-snake");
    const grids = document.querySelectorAll(".grid");

    const countdown = document.querySelector(".countdown");

    switch (themed) {
        case 1:
            //Light
            if (snakeBanner !== null) {
                snakeBanner.style.borderColor = "var(--border-banner-default)";
                snakeBanner.style.background = "var(--snake-banner-default)";
                snakeBanner.style.color = "var(--snake-bannerFont-default)";
                message.style.color = "var(--snake-text-default)"
            } else if (snakeCage !== null) {
                snakeCage.style.borderColor = "var(--snake-cageBorder-default)";
                statsSnake.style.color = "var(--snake-text-default)";
                grids.forEach(grid => {
                    grid.style.backgroundColor = "var(--grids-background-default)";
                })
            }

            if(countdown !== null) {
                countdown.style.color = "#000"
            }
                
            
        break;

        case 2:
            // Dark
            if (snakeBanner !== null) {
                snakeBanner.style.borderColor = "var(--border-banner-dark)";
                snakeBanner.style.background = "var(--snake-banner-dark)";
                snakeBanner.style.color = "var(--snake-bannerFont-dark)";
                message.style.color = "var(--snake-text-dark)"
            } else if (snakeCage !== null) {
                snakeCage.style.borderColor = "var(--snake-cageBorder-dark)";
                statsSnake.style.color = "var(--snake-text-dark)";
                grids.forEach(grid => {
                    grid.style.backgroundColor = "var(--grids-background-dark)";
                })
            }

            if(countdown !== null) {
                countdown.style.color = "#fff"
            }
        break;

        case 0:
            // Rose
            if (snakeBanner !== null) {
                snakeBanner.style.borderColor = "var(--border-banner-rose)";
                snakeBanner.style.background = "var(--snake-banner-rose)";
                snakeBanner.style.color = "var(--snake-bannerFont-rose)";
                message.style.color = "var(--snake-text-rose)"
            } else if (snakeCage !== null) {
                snakeCage.style.borderColor = "var(--snake-cageBorder-rose)";
                statsSnake.style.color = "var(--snake-text-rose)";
                grids.forEach(grid => {
                    grid.style.backgroundColor = "var(--grids-background-rose)";
                })
            }

            if(countdown !== null) {
                countdown.style.color = "#000"
            }
        break;
    }
}

function themeFillTicTacToe() {
    const bannerTic = document.querySelector(".banner-tic");
    const messageTic = document.querySelector(".message-tic");
    const typeButtons = document.querySelectorAll(".type-tic button");
    const ticArea = document.querySelector(".tic-area");
    const three = document.querySelector(".three");
    const threeDiv = document.querySelectorAll(".three div");
    const five = document.querySelector(".five");
    const fiveDiv = document.querySelectorAll(".five div");
    const ticScores = document.querySelector(".tic-scores")
    const ticReset = document.querySelector(".tic-reset");
    const ticSession = document.querySelector(".tic-session");

    const countdown = document.querySelector(".countdown");

    switch (themed) {
        case 1:
            // Light
            if (bannerTic !== null) {
                bannerTic.style.backgroundColor = "var(--tic-banner-default)";
                bannerTic.style.color = "var(--tic-bannerText-default)";
                bannerTic.style.borderColor = "var(--tic-bannerBorder-default)";
                messageTic.style.color = "var(--tic-text-default)";

                countdown.style.color = "000";
                typeButtons.forEach(buttons => {
                    buttons.style.backgroundColor = "var(--tic-button-default)";
                })
            }

            if (ticArea !== null) {
                ticScores.style.color = "var(--tic-text-default)";
                ticScores.style.borderColor = "var(--tic-text-default)";
                ticArea.style.color = "var(--tic-text-default)";
                ticReset.style.backgroundColor = "var(--tic-button-default)";
            }

            if (ticSession !== null) {
                ticSession.style.backgroundColor = "var(--tic-button-default)";
            }

            if (three !== null) {
                three.style.borderColor = "var(--tic-areaBorder-default)";

                threeDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-default)";
                    div.style.backgroundColor = "var(--tic-areaBackground-default)";
                })
            }

            if (five !== null) {
                five.style.borderColor = "var(--tic-areaBorder-default)";

                fiveDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-default)";
                    div.style.backgroundColor = "var(--tic-areaBackground-default)";
                })
            }

        break;
        case 2:
            // Dark
            if (bannerTic !== null) {
                bannerTic.style.backgroundColor = "var(--tic-banner-dark)";
                bannerTic.style.color = "var(--tic-bannerText-dark)";
                bannerTic.style.borderColor = "var(--tic-bannerBorder-dark)";
                messageTic.style.color = "var(--tic-text-dark)";

                if(countdown !== null) {
                    countdown.style.color = "#fff"
                }

                typeButtons.forEach(buttons => {
                    buttons.style.backgroundColor = "var(--tic-button-dark)";
                })
            }

            if (ticArea !== null) {
                ticScores.style.color = "var(--tic-text-dark)";
                ticScores.style.borderColor = "var(--tic-text-dark)";
                ticArea.style.color = "var(--tic-text-dark)";
                ticReset.style.backgroundColor = "var(--tic-button-dark)";
            }

            if (ticSession !== null) {
                ticSession.style.backgroundColor = "var(--tic-button-dark)";
            }

            if (three !== null) {
                three.style.borderColor = "var(--tic-areaBorder-dark)";

                threeDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-dark)";
                    div.style.backgroundColor = "var(--tic-areaBackground-dark)";
                })
            }

            if (five !== null) {
                five.style.borderColor = "var(--tic-areaBorder-dark)";

                fiveDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-dark)";
                    div.style.backgroundColor = "var(--tic-areaBackground-dark)";
                })
            }

        break;

        case 0:
            // Rose
            if (bannerTic !== null) {
                bannerTic.style.backgroundColor = "var(--tic-banner-rose)";
                bannerTic.style.color = "var(--tic-bannerText-rose)";
                bannerTic.style.borderColor = "var(--tic-bannerBorder-rose)";
                messageTic.style.color = "var(--tic-text-rose)";
                countdown.style.color = "000";
                typeButtons.forEach(buttons => {
                    buttons.style.backgroundColor = "var(--tic-button-rose)";
                })
            }

            if (ticArea !== null) {
                ticScores.style.color = "var(--tic-text-rose)";
                ticScores.style.borderColor = "var(--tic-text-rose)";
                ticArea.style.color = "var(--tic-text-rose)";
                ticReset.style.backgroundColor = "var(--tic-button-rose)";
            }

            if (ticSession !== null) {
                ticSession.style.backgroundColor = "var(--tic-button-rose)";
            }

            if (three !== null) {
                three.style.borderColor = "var(--tic-areaBorder-rose)";

                threeDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-rose)";
                    div.style.backgroundColor = "var(--tic-areaBackground-rose)";
                })
            }

            if (five !== null) {
                five.style.borderColor = "var(--tic-areaBorder-rose)";

                fiveDiv.forEach(div => {
                    div.style.borderColor = "var(--tic-areaBorder-rose)";
                    div.style.backgroundColor = "var(--tic-areaBackground-rose)";
                })
            }

        break;
    }
}

function themeFillHistory() {
   const historyBanner = document.querySelector(".history-banner h6");
   const historyMenu = document.querySelector(".history-menu");
   const icons = document.querySelectorAll(".icons");

   const backMenu = document.querySelector(".back-to-menu");
   const historyTable = document.querySelector(".history-table");
   const tableBorder = [
       document.querySelectorAll(".history-table th"),
       document.querySelectorAll(".history-table td")
   ];

   switch (themed) {
        case 1:
            // Default
            if (historyBanner !== null) {
                historyBanner.style.color = `var(--history-bannerText-default)`;
                historyBanner.style.borderColor = `var(--history-bannerBorder-default)`;
                historyBanner.style.backgroundColor = `var(--history-bannerBg-default)`;
            }

            if (historyMenu !== null) {
                historyMenu.style.backgroundColor = `var(--history-menuBg-default)`;
                historyMenu.style.borderColor = `var(--history-bannerBorder-default)`;
                icons.forEach(icon => {
                    icon.style.setProperty('--items-hover', '#ae00ffbb')
                })
            }

            if (historyTable !== null) {
                historyTable.style.color = `var(--history-saveTxt-default)`;
                historyTable.style.backgroundColor = `var(--history-saveBg-default)`;
                historyTable.style.borderColor = `var(--history-bannerBorder-default)`; 
                backMenu.style.backgroundColor = `var(--history-backBg-default)`;
                backMenu.style.color = `var(--history-backTxt-default)`;
            }

            if (tableBorder.length >= 2) {
                tableBorder[0].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-default)`;
                })
                tableBorder[1].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-default)`;
                })
            }
        break;

        case 2:
            // Dark
            if (historyBanner !== null) {
                historyBanner.style.color = `var(--history-bannerText-dark)`;
                historyBanner.style.borderColor = `var(--history-bannerBorder-dark)`;
                historyBanner.style.backgroundColor = `var(--history-bannerBg-dark)`;
            }

            if (historyMenu !== null) {
                historyMenu.style.backgroundColor = `var(--history-menuBg-dark)`;
                historyMenu.style.borderColor = `var(--history-bannerBorder-dark)`;
                icons.forEach(icon => {
                    icon.style.setProperty('--items-hover', '#b59e55')
                })
            }

            if (historyTable !== null) {
                historyTable.style.color = `var(--history-saveTxt-dark)`;
                historyTable.style.backgroundColor = `var(--history-saveBg-dark)`;
                historyTable.style.borderColor = `var(--history-bannerBorder-dark)`; 
                backMenu.style.backgroundColor = `var(--history-backBg-dark)`;
                backMenu.style.color = `var(--history-backTxt-dark)`;
            }

            if (tableBorder.length >= 2) {
                tableBorder[0].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-dark)`;
                })
                tableBorder[1].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-dark)`;
                })
            }
        break;

        case 0:
            // Rose

            if (historyBanner !== null) {
                historyBanner.style.color = `var(--history-bannerText-rose)`;
                historyBanner.style.borderColor = `var(--history-bannerBorder-rose)`;
                historyBanner.style.backgroundColor = `var(--history-bannerBg-rose)`;
            }

            if (historyMenu !== null) {
                historyMenu.style.backgroundColor = `var(--history-menuBg-rose)`;
                historyMenu.style.borderColor = `var(--history-bannerBorder-rose)`;
                icons.forEach(icon => {
                    icon.style.setProperty('--items-hover', '#e49b9b')
                })
            }

            if (historyTable !== null) {
                historyTable.style.color = `var(--history-saveTxt-rose)`;
                historyTable.style.backgroundColor = `var(--history-saveBg-rose)`;
                historyTable.style.borderColor = `var(--history-bannerBorder-rose)`; 
                backMenu.style.backgroundColor = `var(--history-backBg-rose)`;
                backMenu.style.color = `var(--history-backTxt-rose)`;
            }
            
            if (tableBorder.length >= 2) {
                tableBorder[0].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-rose)`;
                })
                tableBorder[1].forEach(border => {
                    border.style.borderColor = `var(--history-bannerBorder-rose)`;
            })
            }
        break;
   }
}