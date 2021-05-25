export default function Splash() {
    const dispatch = useDispatch();

    return (
      <div className="story-cards">
          <div className="story-card">
              <div className="story-card-text">
                  <h1 className="story-card-title">
                      Unlimited Cat Videos, Cat Meows, and Purrs.
                  </h1>
                  <h2 className="story-card-subtitle">
                      Watch cats anywhere, pet them through the screen
                  </h2>
                  <div className="story-email-button">
                  <a href="/signup" class="button">Get Started</a>
                  </div>

              </div>
          </div>

      </div>
    );

  }
