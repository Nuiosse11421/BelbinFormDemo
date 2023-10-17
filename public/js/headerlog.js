document.addEventListener('DOMContentLoaded', function () {
    const loggedInContent = document.getElementById('loggedInContent');
    const nonLoggedInContent = document.getElementById('nonLoggedInContent');

    // Check if user is logged in and adjust content visibility
    if ( <%= user && user._id ? 'true' : 'false' %> ) {
    loggedInContent.style.display = 'block';
    nonLoggedInContent.style.display = 'none';
} else {
    loggedInContent.style.display = 'none';
    nonLoggedInContent.style.display = 'block';
}
});