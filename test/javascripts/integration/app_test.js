module("Articles", {
    setup: function() {
        console.log(App);
        Ember.run(App, App.advanceReadiness);
    },
    teardown: function() {
        App.reset();
    }
});

test("HTML is returned", function() {
    expect(1);
    
    visit("/").then(function() {
        ok(exists("*"), "The app has rendered.");
    });
});

test("Title bar is rendered", function(){
    expect(1);
    
    visit("/").then(function(){
        ok(exists("h1.title-bar"), "The title has rendered");
    });
});

test("Files data loaded", function(){
    expect(2);
    visit("/").then(function(){
        ok(exists('td:contains(Make Vagrant Up Yours by Juan Treminio)'), "Files are loaded and displayed as a list");
        ok(exists('td:contains(PHP Sucks! But I Like It! by Anthony Ferrara)'), "Files are loaded and displayed as a list");
    });
});

test("Title binds", function(){
    expect(1);
    visit("/").then(function(){
        fillIn("input", "test").then(function(){
            ok(exists('h1.title-bar:contains(Ember Application by test)'), "Property binding is displayed correctly");
        });
    });
});

test("File is displayed", function(){
    expect(3);
    visit("/").then(function(){
        return click("tr a:first");
    }).then(function(){
            // We should be looking at Make Vagrant Up Your
            ok(exists("h2:contains(Make Vagrant Up Yours)"), "Title is displayed prominently");
            ok(exists("h3:contains(by Juan Treminio)"), "Author is displayed prominently");
            ok(exists("div:contains(is an unpronounceable GUI tool to help)"), "File contents displayed");
        });
});

test("File is editable", function(){
    expect(6);
    visit("/make-vagrant-up-yours")
        .click("button:contains(Edit)")
        .then(function(){
            ok(exists("input#title"), "Title text field exists");
            ok(exists("input#author"), "Author text field exists");
            ok(exists("textarea#contents"), "Contents text field exists");
            
            fillIn("input#title", "new title").then(function(){
                ok(exists("h2:contains(new title)"), "Title field is bound correctly");
            });
            fillIn("input#author", "new author").then(function(){
                ok(exists("h3:contains(new author)"), "Author field is bound correctly");
            });
        })
        .click("button:contains(Done)")
        .then(function(){
            ok(exists("button:contains(Edit)"), "The edit button is displayed after done is selected.");
        });
});