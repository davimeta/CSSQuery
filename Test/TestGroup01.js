/** STEP_INDEX of test step 测试项编号 */
var STEP_INDEX = 0;
/** work result of current test step  is success记录当前测试是否成功 */
var isSuccess = true;
/** result message of current test step 输出测试结果的描述信息 */
var resultMessage = "";
/** current date string for test output 用于测试输出的日期字符串 */
var DATE_STRING = new Date().toLocaleDateString();

/**
 * output test result to table row 输出测试结果到表格对应行
 * @param {*} STEP_INDEX 
 * @param {*} isSuccess 
 * @param {*} resultMessage 
 */
function output(stepIndex, isSuccess, resultMessage) {
    var el = document.getElementsByTagName('pre')[stepIndex];
    el.innerText = resultMessage;
    el.style.backgroundColor = isSuccess ? "#00ee00" : "ee0000";
}
/**
 * assert is True 是否为真的断言
 * @param {bool} isTrue 
 * @param {string} resultMessage 
 */
function AssertTrue(isTrue, resultMessage) {
    output(STEP_INDEX, isTrue, resultMessage)
}
//test steps
//1
{
    STEP_INDEX = 0;
    var test01 = window.$css('.test');
    isSuccess = (test01 != null && test01.length > 0);
    resultMessage = isSuccess ? "OK(success to query selectors)" : "Fail";
    AssertTrue(isSuccess, resultMessage)
}
//2
{
    STEP_INDEX++;
    var q = $css('input[name=key]');
    q.val(DATE_STRING);
    var targetValue = document.getElementsByName('key')[0].value;
    isSuccess = (DATE_STRING == targetValue);
    resultMessage = isSuccess ? "OK(set value success)" : "Fail"
        + (q.length == 0 ? "(fail to query selectors)" : "(set value fail)");
    AssertTrue(isSuccess, resultMessage);
}
//3
{
    STEP_INDEX++;
    var COLOR = 'red';
    $css('li:nth-child(1)').css('color', COLOR);
    var color = document.getElementsByTagName('li')[0].style.color;
    isSuccess = (COLOR == color);
    resultMessage = isSuccess ? "OK(set color success)" : "Fail(set color fail)";
    AssertTrue(isSuccess, resultMessage);
}
//4
{
    STEP_INDEX++;
    var TIME_WAIT = 'TIME...';
    document.getElementById('lbTime').innerText = TIME_WAIT;
    $css('#btnTime').click();
    var timeString = document.getElementById('lbTime').innerText;
    isSuccess = (TIME_WAIT != timeString);
    resultMessage = isSuccess ? "OK(click event success)" : "Fail(click event fail)";
    AssertTrue(isSuccess, resultMessage);
}
//5
{
    STEP_INDEX++;
    var q = $css('.test').find('p:nth-child(1)');
    q.css('font-size', '32px');
    isSuccess = (q != null && q.length > 0);
    resultMessage = isSuccess ? "OK(success to query child selectors)" : "Fail";
    AssertTrue(isSuccess, resultMessage);
}
//6
{
    STEP_INDEX++;
    var q = $css('.test > ul > li').findAt(2, 'p:nth-child(1)');
    q.css('color', 'blue');
    isSuccess = (q != null && q.length > 0);
    resultMessage = isSuccess ? "OK(success to query child selectors)" : "Fail";
    AssertTrue(isSuccess, resultMessage);
}
//7
{
    STEP_INDEX++;
    isSuccess = false;
    $css('.test > ul > li > p').each(function(index, p) {
        isSuccess = true;
        if(index % 2 == 1){
            p.innerText = p.innerText + ">>>" + index;
        }
    })
    resultMessage = isSuccess ? "OK(success to each)" : "Fail";
    AssertTrue(isSuccess, resultMessage);
}