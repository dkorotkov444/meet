Feature: Show/Hide event details
    Scenario: An event element is collapsed by default.
        Given the user views the list of events
        When the list is initially loaded
        Then all event elements are collapsed and only basic information is visible

    Scenario: User can expand an event to see details.
        Given an event element is collapsed
        When the user clicks the expand control for that event
        Then the event details (Google Calendar link, description) are shown

    Scenario: User can collapse an event to hide details.
        Given an event element is expanded and showing details
        When the user clicks the collapse control for that event
        Then the event details are hidden and the element returns to its collapsed state
