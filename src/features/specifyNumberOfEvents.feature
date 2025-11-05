Feature: Specify number of events
    Scenario: When user has not specified a number, 32 events are shown by default.
        Given the user is on the main event list page
        When the user has not changed the number of events setting
        Then the system displays exactly 32 events by default

    Scenario: User can change the number of events displayed.
        Given the user has access to the number of events setting
        When the user sets the number of events to a new value (e.g., 10)
        Then the system displays only the specified number of events
