const assert = require('assert');

Feature('Flow creation and execution');

Before((login) => {
    login('admin');
});

Scenario('@basic: Creating a simple flow', async (I, Flow, Device, Notification, Template) => {
    Flow.init(I);
    Template.init(I);
    Device.init(I);


    Template.clickOpenTemplatePage();
    Template.clickCreateNew();

    Template.fillNameTemplate('Template');

    Template.addAttr(
        'input',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.string,
        []
    );

    Template.addAttr(
        'output',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.string,
        []
    );
    Template.clickSave();

    Device.clickOpenDevicePage();
    //Device.change64QtyToShowPagination();

    I.refreshPage();

    Device.clickCreateNew();
    Device.fillNameDevice('String device');
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('Template');
    Device.clickBack();
    Device.clickSave();

    Device.seeHasCreated();

    I.wait(5)

    I.refreshPage();

    Device.clickDetailsDeviceByDeviceName('String device');


    let url = await I.grabCurrentUrl();
    const deviceId=url.substring(url.lastIndexOf('/id/') + 4, url.lastIndexOf('/detail'));

    Flow.clickOpen();
    Flow.clickCreateNew();
    I.wait(3);
    Flow.setFlowName('my flow');
    I.wait(5);
    Flow.addDeviceInput();
    Flow.addSwitch();
    Flow.addChange();
    Flow.addDeviceOutput();
    Flow.addNotification();

    await Flow.connectFlows();

    Flow.clickOnDeviceInput();
    Flow.editDeviceInputName();
    Flow.selectDevice(deviceId);
    Flow.selectPublish();
    Flow.clickOnDone();

    Flow.clickOnSwitch();
    Flow.editSwitchProperty();
    Flow.editSwitchCondition();
    Flow.clickOnDone();

    Flow.clickOnChange();
    Flow.editChangeProperty();
    Flow.editChangePropertyValue();
    Flow.clickOnDone();

    Flow.clickOnDeviceOutput();
    Flow.editDeviceOutputSource();
    Flow.clickOnDone();

    Flow.clickOnNotificationInput();
    Flow.editMessageType();
    Flow.editMessageDynamicValue();
    Flow.editMessageInputSource();
    Flow.clickOnDone();

    Flow.clickOnSave();
    Flow.seeFlowHasCreated();

    I.refreshPage();

    I.wait(2);
    Device.openDevicesPage();
    I.refreshPage();
    I.wait(5);

    Device.clickDetailsDeviceByDeviceName('String device');
    // Device.clickDetailsDevice(deviceId);
    Device.selectAttr('input');

    await Device.selectAttrSync('output');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(20);

    Device.shouldSeeMessage('output value');

    await Notification.openNotificationsPage();
    const totalBefore = await Notification.totalOfMessagesWithText('output value');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(10);
    // const total2 = await Notification.totalOfMessagesWithText('output value');

    I.see('output value')

    // assert.strictEqual(total2, total1+1);
    //await Notification.shouldISeeMessagesWithText('output value', totalBefore + 1);
});