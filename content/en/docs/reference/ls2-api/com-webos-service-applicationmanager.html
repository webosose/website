---
title: com.webos.service.applicationmanager
date: 2021-01-21
weight: 90
toc: true
---

<div>
  <h2>API Summary</h2>
  <p><span style="color:#333333">Provides methods for managing application life cycle, application information, LaunchPoint list.</span></p>
</div>
<h2>Overview of the API</h2>
<div>
  <p>NA</p>
  <ul>
  </ul>
</div>
<h2>Methods</h2>
<div>
  <h3>launch</h3>
  <div>
    <h4>Description</h4>
    <p>Launches an application corresponding to the given application ID. Opens the service or app.</p>
    <p>Example: The user can download a content with a service in the background. Once the content is downloaded, the service must launch the app again.</p>
    <p>Parameter can be given&nbsp;in the JSON object during the launch of the application. The method can be called multiple times for the same application with different parameters. Application should handle these overtime requests. Generally, application is re-launched for every request.</p>
    <p><strong>Note : </strong>At least one parameter is required. (&#39;id&#39;, &#39;launchPointId&#39;, &#39;instanceId&#39;)</p>
    <h4>Parameters</h4>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th width="15%">
              <p>Name</p>
            </th>
            <th width="15%">
              <p>Required</p>
            </th>
            <th width="15%">
              <p>Type</p>
            </th>
            <th>
              <p>Description</p>
            </th>
          </tr>
          <tr>
            <td>id</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the application ID to be launched.</p>
            </td>
          </tr>
          <tr>
            <td>launchPointId</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the launch point ID of the app.</p>
            </td>
          </tr>
          <tr>
            <td>instanceId</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the instance ID of the app.</p>
            </td>
          </tr>
          <tr>
            <td>params</td>
            <td>Optional</td>
            <td>Object: <a href="#params"> params</a></td>
            <td>
              <p>If&nbsp;<strong>params&nbsp;</strong>is used, it should contain information on the target application. Specify correct parameters for each application. See the following parameter examples:</p>
              <ul>
                <li>YouTube application: &quot;params&quot;:{ &quot;contentTarget&quot; : &quot;https://www.youtube.com/tv?v=9bZkp7q19f0&quot;}</li>
                <li>Today application: &quot;params&quot;:{&quot;type&quot;:&quot;showRecordedList&quot;}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>keepAlive</td>
            <td>Optional</td>
            <td>Boolean</td>
            <td>
              <p>Indicates the status of the application running in the background.</p>
              <p>Possible values are:&nbsp;</p>
              <ul>
                <li><strong>true:</strong> To run the application in the background, set&nbsp;<strong>keepAlive</strong>&nbsp;to&nbsp;<strong>true</strong>.&nbsp;</li>
                <li><strong>false:</strong> To terminate the application, set&nbsp;<strong>keepAlive</strong>&nbsp;to&nbsp;<strong>false</strong>.</li>
              </ul>
              <p>Default:&nbsp;<strong>keepAlive</strong>&nbsp;is set to&nbsp;<strong>false</strong>.</p>
              <p><strong>Note:</strong> Only applicable to web app. Do not use&nbsp;<strong>keepAlive</strong>&nbsp;for native app launching. An web App, which is launched with this parameter, can be killed when memory status is low or critical.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Call Returns</h4>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th width="15%">
              <p>Name</p>
            </th>
            <th width="15%">
              <p>Required</p>
            </th>
            <th width="15%">
              <p>Type</p>
            </th>
            <th>
              <p>Description</p>
            </th>
          </tr>
          <tr>
            <td>returnValue</td>
            <td>Required</td>
            <td>Boolean</td>
            <td>
              <p>Indicates the status of operation.</p>
              <p>Possible values are:</p>
              <ul>
                <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
                <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>errorCode</td>
            <td>Optional</td>
            <td>Number</td>
            <td>
              <p>The error code for the failed operation.</p>
            </td>
          </tr>
          <tr>
            <td>errorText</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the reason for the failure of the operation.&nbsp;See the &quot;<strong>API&nbsp;Error Codes Reference&quot;</strong>&nbsp;section of this method for details.</p>
            </td>
          </tr>
          <tr>
            <td>instanceId</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the instanceId of the running application.</p>
            </td>
          </tr>
          <tr>
            <td>launchPointId</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the launchPointId of running application.</p>
            </td>
          </tr>
          <tr>
            <td>appId</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>Indicates the appld&nbsp;of the running application.</p>
            </td>
          </tr>
          <tr>
            <td>displayId</td>
            <td>Optional</td>
            <td>Number (uint32_t)</td>
            <td>
              <p>Indicates the displayId of the running application.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Example</h4>
    <div class="code-bg-grey">
      <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch &#39;{<br />
        &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.yourdomain.callee&quot;<br />
        }&#39;<br />
        {<br />
        &nbsp;&nbsp;&nbsp;&quot;launchPointId&quot;: &quot;com.yourdomain.callee_default&quot;,<br />
        &nbsp;&nbsp;&nbsp;&quot;appId&quot;: &quot;com.yourdomain.callee&quot;,<br />
        &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;: true,<br />
        &nbsp;&nbsp;&nbsp;&quot;displayId&quot;: 0,<br />
        &nbsp;&nbsp;&nbsp;&quot;instanceId&quot;: &quot;a3effa8b-fe4a-4f5c-953b-0d326c0d2ef20&quot;<br />
        }</p>
    </div>
    <div class="code-bg-grey">
      <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch &#39;{<br />
        &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.yourdomain.callee&quot;,<br />
        &nbsp;&nbsp;&nbsp;&quot;params&quot;: {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;customParam1&quot;: &quot;value1&quot;<br />
        &nbsp;&nbsp;&nbsp;}<br />
        }<br />
        {<br />
        &nbsp;&nbsp;&nbsp;&quot;launchPointId&quot;: &quot;com.yourdomain.callee_default&quot;,<br />
        &nbsp;&nbsp;&nbsp;&quot;appId&quot;: &quot;com.yourdomain.callee&quot;,<br />
        &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;: true,<br />
        &nbsp;&nbsp;&nbsp;&quot;displayId&quot;: 0,<br />
        &nbsp;&nbsp;&nbsp;&quot;instanceId&quot;: &quot;a3effa8b-fe4a-4f5c-953b-0d326c0d2ef20&quot;<br />
        }</p>
    </div>
  </div>
</div>
<h3>pause</h3>
<div>
  <h4>Description</h4>
  <p>Pauses an application.</p>
  <p><strong>Note</strong>: At least one parameter is required. (&#39;id&#39;, &#39;launchPointId&#39;, &#39;instanceId&#39;)</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the id of the application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the&nbsp;launchPointId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>params</td>
          <td>Optional</td>
          <td>Object</td>
          <td>
            <p>If&nbsp;<strong>params&nbsp;</strong>is used, it should contain information on the target application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false: </strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;<strong>API Error Codes Reference</strong>&quot; section for details.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the appId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number (int32_t)</td>
          <td>
            <p>Indicates the displayId of the running application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/pause &#39;{<br />
      &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>close</h3>
<div>
  <h4>Description</h4>
  <p>Closes an application.</p>
  <p><strong>Note A: </strong>At least one parameter is required. (&#39;id&#39;, &#39;launchPointId&#39;, &#39;instanceId&#39;)</p>
  <p><strong>Note B: </strong>Don&#39;t use this API in TV and signage. The API is deprecated in the platforms.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the id&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId&nbsp;of the application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false: </strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the <strong>&quot;Error Codes&quot; </strong>section of this method for details.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the processId&nbsp;of the closed application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the appId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number (int32_t)</td>
          <td>
            <p>Indicates the displayId of running application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>Invalid processId specified</td>
          <td>
            <p>Invalid processId is specified.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Not string</td>
          <td>
            <p>Invalid type value.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Unknown Process</td>
          <td>
            <p>Unknown processId.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/close&nbsp;&#39;{<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;<br />
      }&#39;<br />
      {<br />
      &nbsp;&nbsp;&nbsp;&quot;launchPointId&quot;: &quot;com.webos.app.test_default&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;appId&quot;: &quot;com.webos.app.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;: true,<br />
      &nbsp;&nbsp;&nbsp;&quot;displayId&quot;: 0,<br />
      &nbsp;&nbsp;&nbsp;&quot;instanceId&quot;: &quot;a3effa8b-fe4a-4f5c-953b-0d326c0d2ef20&quot;<br />
      }</p>
  </div>
</div>
<h3>closeByAppId</h3>
<div>
  <h4>Description</h4>
  <p>Closes an application by appId in the system manager.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the id of the application.</p>
          </td>
        </tr>
        <tr>
          <td>reason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason of why the app was&nbsp;closed. Subscribers who are watching app status will get the&nbsp;reason.</p>
            <p><strong>Note:&nbsp;</strong>This parameter is only for&nbsp;<strong>reserved caller</strong>&nbsp;such as surfacemanager. Other services or apps should not use this parameter.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation.&nbsp;See the &quot;<strong>Error Codes Reference&quot;</strong>&nbsp;section of this method for details.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId of the running application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the displayId of the running application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>invalid parameter</td>
          <td>
            <p>invalid parameter.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>no app description</td>
          <td>
            <p>Invalid appId is specified. That is, the &#39;id&#39; parameter is empty.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Not string</td>
          <td>
            <p>Invalid type value.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>app is not running</td>
          <td>
            <p>Application is not running.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/closeByAppId &#39;{<br />
      &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;<br />
      }&#39;</p>
  </div>
</div>
<h3>listApps</h3>
<div>
  <h4>Description</h4>
  <p>Lists all of the registered applications.</p>
  <p><strong>Note:</strong> Client can get all installed application information using&nbsp;this API.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribe to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
            <p>Default:&nbsp;<strong>false</strong></p>
          </td>
        </tr>
        <tr>
          <td>properties</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p>Indicates the value to be extracted from appinfo.json file.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.</li>
            </ul>
            <p>Default:<strong> </strong><strong>true</strong></p>
          </td>
        </tr>
        <tr>
          <td>apps</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>If the&nbsp;<strong>listApps&nbsp;</strong>method succeeds, the array of the applications will be returned.</p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribe to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>apps</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>Either this, or <strong>app</strong> is required.</p>
            <p><strong><span style="color:#333333">apps</span></strong><strong><span style="color:#333333">&nbsp;</span></strong><span style="color:#333333">is returned when all apps&#39; information has been changed by language change</span>.</p>
          </td>
        </tr>
        <tr>
          <td>app</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>Either this, or <strong>apps</strong> is required.</p>
            <p><strong><span style="color:#333333">app</span></strong><span style="color:#333333"> is returned the information of an app which has been installed/updated/removed.</span></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribe to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
            <p>Default:<strong> true</strong></p>
          </td>
        </tr>
        <tr>
          <td>change</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason why the app&rsquo;s information has been changed.</p>
            <p>Possible values are:</p>
            <ul>
              <li>&ldquo;added&rdquo;</li>
              <li>&ldquo;updated&rdquo;</li>
              <li>&ldquo;removed&rdquo;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>changeReason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason behind the target app being added/removed.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>This method returns information for all apps at first.</p>
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/listApps &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:&nbsp;</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;apps&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;....&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;],<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
    <p>When an app is update/removed/installed, the method returns only changed app&#39;s information</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;change&quot;:&quot;removed&quot;,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;app&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &quot;...&quot;<br />
      &nbsp; &nbsp;}<br />
      }</p>
  </div>
</div>
<h3>running</h3>
<div>
  <h4>Description</h4>
  <p>Lists the background/foreground applications and their process IDs that are running on webOS platform.</p>
  <p><strong>Note:</strong> This API is one of key methods of applicationmanager.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.&nbsp;</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
            <p><strong></strong>Default:&nbsp;<strong>false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.</li>
            </ul>
            <p>Default: <strong>true</strong></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.&nbsp;</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed<strong></strong></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>running</td>
          <td>Required</td>
          <td>Object array: <a href="#running"> running</a></td>
          <td>
            <p>If the <strong>running </strong>method succeeds, the array of the running applications will be returned.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.</li>
            </ul>
            <p>Default: <strong>true</strong></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.&nbsp;</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed<strong></strong></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>running</td>
          <td>Required</td>
          <td>Object array: <a href="#running"> running</a></td>
          <td>
            <p>If the&nbsp;<strong>running&nbsp;</strong>method succeeds, the array of the running applications will be returned.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/running &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:&nbsp;</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;running&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;id&quot;:&quot;bareapp&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;...&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;],<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>dev/closeByAppId</h3>
<div>
  <h4>Description</h4>
  <p>Closes an application by the application id.</p>
  <p><strong>Note:&nbsp;</strong>Available only in developer mode (devmode).&nbsp;To enable devmode, call &#39;com.webos.service.devmode&#39; (&#39;setDevMode&#39;) with value &#39;true&#39;.&nbsp;</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application id&nbsp;to be closed.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. &nbsp;See the &quot;Error Codes&quot;&nbsp;section of this method for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId of running application.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId of running application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number (int32_t)</td>
          <td>
            <p>Indicates the displayId of the running application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>app is not running</td>
          <td>
            <p>The application that you want to close is not running.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>no app description</td>
          <td>
            <p>Passed <strong>id</strong> is invalid. That is, <strong>id</strong>&nbsp;parameter is empty.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Not string</td>
          <td>
            <p>Passed value is an invalid type.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>invalid parameter</td>
          <td>
            <p>Passed parameter is invalid.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Only Dev app should be closed using /dev category_API</td>
          <td>
            <p>In devmode, an application must&nbsp;be closed by <strong>dev/closeByAppId</strong> method.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/dev/closeByAppId &#39;{<br />
      &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;<br />
      }&#39;</p>
  </div>
</div>
<h3>dev/listApps</h3>
<div>
  <h4>Description</h4>
  <p>Lists all of the registered applications.</p>
  <p><strong>Note:&nbsp;</strong></p>
  <ul>
    <li>Available only in developer mode (devmode).&nbsp;To enable devmode, call &#39;com.webos.service.devmode&#39; (&#39;setDevMode&#39;) with value &#39;true&#39;.&nbsp;</li>
    <li>Works for devmode app type.</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> Subscribe to get notifications</li>
              <li><strong>false</strong>: Do not subscribe</li>
            </ul>
            <p>Default: <strong>false</strong></p>
          </td>
        </tr>
        <tr>
          <td>properties</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p>Indicates the name of properties to be extracted from appinfo.json file.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;See the &quot;API Error Codes Reference&quot; for more information.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> Subscribed to get notifications</li>
              <li><strong>false:</strong> Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>apps</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>If the <strong>dev/listApps&nbsp;</strong>method succeeds, the array of the applications will be returned.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;See the &quot;API Error Codes Reference&quot; for more information.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>apps</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>Either this, or <strong>app</strong> will be returned.</p>
            <p><strong><span style="color:rgb(51,51,51)">apps</span></strong><strong><span style="color:rgb(51,51,51)">&nbsp;</span></strong><span style="color:rgb(51,51,51)">is returned when all apps&#39; information has been changed by language change.</span></p>
          </td>
        </tr>
        <tr>
          <td>app</td>
          <td>Required</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>Either this, or <strong>apps</strong>&nbsp;will be&nbsp;required.</p>
            <p><strong><span style="color:rgb(51,51,51)">app</span></strong><span style="color:rgb(51,51,51)"> is returned the information of an app which has been installed/updated/removed.</span></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> Subscribed to get notifications</li>
              <li><strong>false:</strong> Not subscribed</li>
            </ul>
            <p>Default:<strong> true</strong></p>
          </td>
        </tr>
        <tr>
          <td>change</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the change in the app information.</p>
            <p>Possible values are:</p>
            <ul>
              <li>added</li>
              <li>updated</li>
              <li>removed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>changeReason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason why the target app is added/removed.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>This method returns information for all apps at first.</p>
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/dev/listApps &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:&nbsp;</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;apps&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;....&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;],<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
    <p>When an app is update/removed/installed, the method returns only changed app&#39;s information</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;change&quot;:&quot;removed&quot;,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;app&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &quot;...&quot;<br />
      &nbsp; &nbsp;}<br />
      }</p>
  </div>
</div>
<h3>dev/running</h3>
<div>
  <h4>Description</h4>
  <p>Lists the background/foreground applications and their process IDs that are running on the webOS platform.</p>
  <p><strong>Note:&nbsp;</strong></p>
  <ul>
    <li>Available only in developer mode (devmode).&nbsp;To enable devmode, call &#39;com.webos.service.devmode&#39; (&#39;setDevMode&#39;) with value &#39;true&#39;.&nbsp;</li>
    <li>Works for devmode app type.</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
            <p>Default:&nbsp;<strong>false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;</li>
            </ul>
            <p><strong>Note: returnValue&nbsp;</strong>will always contain&nbsp;<strong>true</strong>.</p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>running</td>
          <td>Required</td>
          <td>Object array: <a href="#running"> running</a></td>
          <td>
            <p>If the <strong>dev/running </strong>method succeeds, the array of the running applications will be returned.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;See the&nbsp;<strong>API Error Codes Reference</strong>&nbsp;for more information.</li>
            </ul>
            <p><strong>Note: returnValue&nbsp;</strong>will always contain&nbsp;<strong>true</strong>.</p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>running</td>
          <td>Required</td>
          <td>Object array: <a href="#running"> running</a></td>
          <td>
            <p>If the <strong>dev/running </strong>method succeeds, the array of the running applications will be returned</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/dev/running &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;running&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;webprocessid&quot;:&quot;&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;defaultWindowType&quot;:&quot;card&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;appType&quot;:&quot;native&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;processid&quot;:&quot;1176&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;],<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>getForegroundAppInfo</h3>
<div>
  <h4>Description</h4>
  <p>Gets the information on the foreground application.</p>
  <p><strong>Note:</strong> The information comes from LSM. Please use extraInfo parameter to get raw responsePayload from LSM.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>extraInfo</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if enabled, the method returns an array of foreground applications.</p>
            <ul>
              <li><strong>true: </strong>Enable.</li>
              <li><strong>false: </strong>Disable.</li>
            </ul>
            <p>Default:&nbsp;<strong>false</strong>.</p>
          </td>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed&nbsp;to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Subscribed to get notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
            <p>Default:<strong>&nbsp;false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;</li>
            </ul>
            <p>Default:<strong> true</strong></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed&nbsp;to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Subscribed to get notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the appId&nbsp;running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId of the application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>Indicates the displayId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>windowId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the windowId&nbsp;of the application running in the foreground.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the processId&nbsp;of the application running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>foregroundAppInfo</td>
          <td>Optional</td>
          <td>Object array: <a href="#foregroundappinfo"> foregroundAppInfo</a></td>
          <td>
            <p>Indicates an array of the foreground application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;</li>
            </ul>
            <p>Default:<strong> true</strong></p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get the notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Subscribed to get the notifications</li>
              <li><strong>false</strong>: Not subscribed</li>
            </ul>
            <p>Default:<strong> true</strong></p>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application ID of the application running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>Indicates the displayId of the application.</p>
          </td>
        </tr>
        <tr>
          <td>windowId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the windowId&nbsp;of the application running in the foreground.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the processId&nbsp;of the application running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>foregroundAppInfo</td>
          <td>Optional</td>
          <td>Object array: <a href="#foregroundappinfo"> foregroundAppInfo</a></td>
          <td>
            <p>Indicates an array of the foreground application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/getForegroundAppInfo &#39;{}&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;bareapp&quot;,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;windowId&quot;:&quot;&quot;,<br />
      &nbsp; &nbsp;&quot;processId&quot;:&quot;&quot;<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/getForegroundAppInfo &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;bareapp&quot;,<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;windowId&quot;:&quot;&quot;,<br />
      &nbsp; &nbsp;&quot;processId&quot;:&quot;&quot;<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/getForegroundAppInfo &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true,<br />
      &nbsp; &nbsp;&quot;extraInfo&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;foregroundAppInfo&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;instanceId&quot;:&quot;c057ba89-6de6-4807-a5fe-81e8af4aac700&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;windowGroup&quot;:false,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;appId&quot;:&quot;bareapp&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;windowType&quot;:&quot;_WEBOS_WINDOW_TYPE_CARD&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;params&quot;:{</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;},<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;windowId&quot;:&quot;&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;processId&quot;:&quot;719&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;],<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>getAppLifeStatus</h3>
<div>
  <h4>Description</h4>
  <p>Provides the application&#39;s life cycle status.</p>
  <p><strong>Note:</strong> This API is useful to do something based on application&#39;s life cycle status.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get the notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed.</li>
            </ul>
            <p>Default:&nbsp;<strong>false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get the notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribe to get notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation.&nbsp;See the &quot;Error Codes&quot;&nbsp;section of this method for details.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates if&nbsp;subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Subscribed for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the appId&nbsp;whose status has been changed.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>status</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the status of the application.</p>
            <p>Possible values are:</p>
            <ul>
              <li>stop</li>
              <li>launching</li>
              <li>relaunching</li>
              <li>foreground</li>
              <li>background</li>
              <li>closing</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the application type.</p>
            <p>Possible values are:</p>
            <ul>
              <li>web</li>
              <li>native</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the processId of the application.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>Indicates the displayId&nbsp;of the application.</p>
          </td>
        </tr>
        <tr>
          <td>reason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>In&nbsp;<strong>LAUNCHING/RELAUNCHING</strong>&nbsp;status, indicates the reason for the launching the target app.</p>
            <p>In&nbsp;<strong>CLOSING/STOP</strong>&nbsp;status, indicates the reason for closing the target app.</p>
          </td>
        </tr>
        <tr>
          <td>windowType</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the windowType of the application.</p>
            <p><strong>Note:</strong> This reason is replied only in&nbsp;<strong>FOREGROUND&nbsp;</strong>status.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroup</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates that the app has window group or not.</p>
            <p><strong>Note:</strong> This reason is replied only in&nbsp;<strong>FOREGROUND&nbsp;</strong>status.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroupOwner</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates that the app is window group owner or not.</p>
            <p><strong>Note:</strong> This reason is replied only in&nbsp;<strong>FOREGROUND&nbsp;</strong>status.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroupOwnerId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the window group&nbsp;owner of the app.</p>
            <p><strong>Note:&nbsp;</strong>This reason is replied only in&nbsp;<strong>FOREGROUND&nbsp;</strong>status.</p>
          </td>
        </tr>
        <tr>
          <td>backgroundStatus</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates whether&nbsp;the app is preloaded or not.</p>
            <p><strong>Note:</strong> This reason is replied only in&nbsp;<strong>BACKGROUND&nbsp;</strong>status.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>subscription is needed</td>
          <td>
            <p><strong>&quot;subscribe&quot;: true</strong> parameter is needed.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>AppLifeStatus can be subscribed by below command,</p>
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/getAppLifeStatus &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
    <p>When barenativeqt is launched, outputs are shown like below.</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;reason&quot;:&quot;&quot;,<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;barenativeqt&quot;,<br />
      &nbsp; &nbsp;&quot;status&quot;:&quot;launching&quot;,<br />
      &nbsp; &nbsp;&quot;type&quot;:&quot;native&quot;<br />
      }</p>
    <p>When barenativeqt is closed, below outputs are shown.</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;reason&quot;:&quot;undefined&quot;,<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;barenativeqt&quot;,<br />
      &nbsp; &nbsp;&quot;status&quot;:&quot;stop&quot;,<br />
      &nbsp; &nbsp;&quot;processId&quot;:&quot;932&quot;,<br />
      &nbsp; &nbsp;&quot;type&quot;:&quot;native&quot;<br />
      }</p>
  </div>
</div>
<h3>getAppLifeEvents</h3>
<div>
  <h4>Description</h4>
  <p>Provides the application&#39;s&nbsp;event status in its life cycle.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribed for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
            <p>Default:&nbsp;<strong>false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if&nbsp;subscribed to get notifications.</p>
            <ul>
              <li><strong>true: </strong>Subscribe for<strong>&nbsp;</strong>notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;API Error Codes Reference&quot; section for details.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if&nbsp;subscribed to get notifications.</p>
            <ul>
              <li><strong>true: </strong>Subscribe for notifications</li>
              <li><strong>false:&nbsp;</strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the appId whose event has been changed.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchPointId&nbsp;of the app.</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the instanceId&nbsp;of the app.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>Indicates the displayId&nbsp;of the app.</p>
          </td>
        </tr>
        <tr>
          <td>event</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application&#39;s status.</p>
            <p>Possible values are:</p>
            <ul>
              <li>splash</li>
              <li>preload</li>
              <li>launch</li>
              <li>foreground</li>
              <li>background</li>
              <li>pause</li>
              <li>close</li>
              <li>stop</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the application title as it is shown in the launcher and in the application window.</p>
            <p><strong>Note: </strong>It is included only when event type is &quot;splash&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>showSplash</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if splash image is shown. This value is set during app scanning.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>:<strong> </strong>Splash image is shown.&nbsp;</li>
              <li><strong>false</strong>: Splash image is not shown.&nbsp;</li>
            </ul>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;splash&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>showSpinner</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the spinner is shown. The value is set during app scanning.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Spinner is shown.&nbsp;</li>
              <li><strong>false: </strong>Spinner is not shown.&nbsp;</li>
            </ul>
            <p><strong>Note: </strong>It is included only when event type is &quot;splash&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>splashBackground</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the background image to be shown while the application is loading.</p>
            <p>Example: splash-background.png.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when the event type is &quot;splash&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>preload</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the current preload status.</p>
            <p>Possible values are:</p>
            <ul>
              <li>full</li>
              <li>semi-full</li>
              <li>partial</li>
              <li>minimal</li>
            </ul>
            <p><strong>Note:</strong>&nbsp;It is included only when the event type is &quot;preload&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>reason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason behind the launching/closing of the target app.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;launch/close/stop&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>windowType</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the windowType of the application.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;foreground&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroup</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates if the application has windowGroup or not.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;foreground&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroupOwner</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates that the application has WindowGroupOwner or not.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;foreground&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>windowGroupOwnerId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the&nbsp;windowGroupOwner of the application.</p>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;foreground&quot;.</p>
          </td>
        </tr>
        <tr>
          <td>status</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the current background status.</p>
            <p>Possible values are:</p>
            <ul>
              <li>preload</li>
              <li>normal</li>
            </ul>
            <p><strong>Note:</strong>&nbsp;It is included only when event type is &quot;background&quot;.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/getAppLifeEvents &#39;{<br />
      &nbsp; &nbsp;&quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
    <p>When livetv app is launched, outputs related to splash are shown like below.</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;event&quot;:&quot;splash&quot;,<br />
      &nbsp; &nbsp;&quot;title&quot;:&quot;Live TV&quot;,<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.livetv&quot;,<br />
      &nbsp; &nbsp;&quot;showSpinner&quot;:true,<br />
      &nbsp; &nbsp;&quot;showSplash&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;splashBackground&quot;:&quot;file:///usr/palm/applications/com.webos.app.livetv/assets/livetv.png&quot;<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p>For error case, if subscribe filed is empty, below error text is shown.</p>
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/getAppLifeEvents &#39;{}&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;subscribed&quot;:false,<br />
      &nbsp; &nbsp;&quot;errorCode&quot;:1,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:false,<br />
      &nbsp; &nbsp;&quot;errorText&quot;:&quot;subscription is required&quot;<br />
      }</p>
  </div>
</div>
<h3>getAppBasePath</h3>
<div>
  <h4>Description</h4>
  <p>Gets the path of the application.</p>
  <p><strong>Note: </strong>This API is useful to get base directory path of installed application.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the appId.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the appId.</p>
          </td>
        </tr>
        <tr>
          <td>basePath</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the application&nbsp;path.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation.&nbsp;See the &quot;Error Codes&quot;&nbsp;section of this method for details.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>Not allowed. Allow only for the info of calling app itself.</td>
          <td>
            <p>Not allowed. Allow only for the information of calling application itself.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Error parsing request:Missing required key</td>
          <td>
            <p>Missing required key.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Error parsing request:Not string</td>
          <td>
            <p>Invalid type value.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -a &quot;bareapp&quot; -f luna://com.webos.service.applicationmanager/getAppBasePath &#39;{<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;bareapp&quot;<br />
      }&#39;</p>
  </div>
</div>
<h3>getAppInfo</h3>
<div>
  <h4>Description</h4>
  <p>Gets the application information.</p>
  <p><strong>Note:</strong> The information is generated from appinfo.json file.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the id of the application.</p>
          </td>
        </tr>
        <tr>
          <td>properties</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p>Indicates the value to be extracted from appinfo.json file.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the appld.</p>
          </td>
        </tr>
        <tr>
          <td>appInfo</td>
          <td>Optional</td>
          <td>Object: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>If the <strong>getAppinfo </strong>method succeeds, the <strong>appInfo</strong> object contains information about the application.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation.&nbsp;See the &quot;Error Codes Reference&quot;&nbsp;section of this method for details.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>Invalid appId specified</td>
          <td>
            <p>Invalid appId is specified. That is, the &#39;id&#39; parameter is empty.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>parameters must contain a &#39;id&#39; (string)</td>
          <td>
            <p>Parameters must contain an &#39;id&#39; (string).</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Invalid appId specified OR Unsupported Application Type</td>
          <td>
            <p>Invalid appId is specified&nbsp;or an unsupported application type.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/getAppInfo &#39;{<br />
      &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.test&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;appInfo&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &quot;...&quot;<br />
      &nbsp; &nbsp;},<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.test&quot;,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>getAppStatus</h3>
<div>
  <h4>Description</h4>
  <p>Gets the application status and information.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the appld.</p>
          </td>
        </tr>
        <tr>
          <td>appInfo</td>
          <td>Optional</td>
          <td>Object: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>Indicates the information of the application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check the&nbsp;&quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the target appld.</p>
          </td>
        </tr>
        <tr>
          <td>event</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates event according to the target app status.</p>
          </td>
        </tr>
        <tr>
          <td>status</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the current app status.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>exist</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if target app is present on the device.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Target app exists&nbsp;on the device.&nbsp;</li>
              <li><strong>false</strong>: Target app does not exist on&nbsp;the device.&nbsp;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>launchable</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates whether the target app could be launched or not.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Target app could be launched.&nbsp;</li>
              <li><strong>false:</strong> Target app could not be launched.&nbsp;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appInfo</td>
          <td>Optional</td>
          <td>Object: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>If the&nbsp;<strong>getAppStatus&nbsp;</strong>method succeeds and the parameter &quot;appInfo&quot; is&nbsp;<strong>true</strong>, the&nbsp;<strong>appInfo</strong>&nbsp;object contains information about the application.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;API Error Codes Reference&quot; section for details.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the target appld.</p>
          </td>
        </tr>
        <tr>
          <td>event</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the event according to the target app status.</p>
          </td>
        </tr>
        <tr>
          <td>status</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the current app status.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>exist</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if target app is present on the device.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> Target app exists&nbsp;on the device.&nbsp;</li>
              <li><strong>false:</strong> Target app does not exist on&nbsp;the device.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>launchable</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates whether the target app could be launched or not. Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Target app could be launched.&nbsp;</li>
              <li><strong>false:</strong>&nbsp;Target app could not be launched.&nbsp;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appInfo</td>
          <td>Optional</td>
          <td>Object array: <a href="#appinfo"> appInfo</a></td>
          <td>
            <p>If the&nbsp;<strong>getAppStatus&nbsp;</strong>method succeeds and the parameter &quot;appInfo&quot; is&nbsp;<strong>true</strong>, the&nbsp;<strong>appInfo</strong>&nbsp;object contains information about the application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/getAppStatus &#39;{<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.browser&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;event&quot;:&quot;nothing&quot;,<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.browser&quot;,<br />
      &nbsp; &nbsp;&quot;status&quot;:&quot;launchable&quot;,<br />
      &nbsp; &nbsp;&quot;exist&quot;:true,<br />
      &nbsp; &nbsp;&quot;launchable&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/getAppStatus &#39;{<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.browser&quot;,<br />
      &nbsp; &nbsp;&quot;appInfo&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;event&quot;:&quot;nothing&quot;,<br />
      &nbsp; &nbsp;&quot;appInfo&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &quot;....&quot; &nbsp; &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.browser&quot;,<br />
      &nbsp; &nbsp; &nbsp; &quot;title&quot;:&quot;Web Browser&quot;,<br />
      &nbsp; &nbsp; &nbsp; &quot;....&quot;<br />
      &nbsp; &nbsp;},<br />
      &nbsp; &nbsp;&quot;appId&quot;:&quot;com.webos.app.browser&quot;,<br />
      &nbsp; &nbsp;&quot;status&quot;:&quot;launchable&quot;,<br />
      &nbsp; &nbsp;&quot;exist&quot;:true,<br />
      &nbsp; &nbsp;&quot;launchable&quot;:true,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p>Example response for a failed call:</p>
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/getAppStatus &#39;{<br />
      &nbsp; &nbsp;&quot;id&quot;:&quot;com.webos.app.browser&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp; &nbsp;&quot;errorCode&quot;:2,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:false,<br />
      &nbsp; &nbsp;&quot;errorText&quot;:&quot;invalid parameters&quot;<br />
      }</p>
  </div>
</div>
<h3>listLaunchPoints</h3>
<div>
  <h4>Description</h4>
  <p>Gets all of the launchpoints.</p>
  <p><strong>Note:</strong> LaunchPoint is the virtual instance of an application. The webOS provides <strong>shortcut</strong> based on launchPoint.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribed for notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
            <p>Default: <strong>false</strong></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed.&nbsp;</li>
            </ul>
            <p><strong>Note: returnValue</strong>&nbsp;will&nbsp;<strong>always&nbsp;</strong>contain&nbsp;<strong>true</strong>.</p>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if subscribed to get notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribed for notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>launchPoints</td>
          <td>Required</td>
          <td>Object array: <a href="#launchpoints"> launchPoints</a></td>
          <td>
            <p>If the&nbsp;<strong>listLaunchPoints</strong>&nbsp;method succeeds, the array of the launchpoints will be returned.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Indicates that the operation was successful.</li>
              <li><strong>false</strong>: Indicates that the operation failed. Check the &quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>subscribed</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates if subscribed to get the notifications.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true: </strong>Subscribed for notifications</li>
              <li><strong>false: </strong>Not subscribed</li>
            </ul>
            <p>Default<strong>: true</strong></p>
          </td>
        </tr>
        <tr>
          <td>launchPoint</td>
          <td>Optional</td>
          <td>Object</td>
          <td>
            <p>Returned if only one app&#39;s launchPoint is changed by updating/removing/installing.</p>
          </td>
        </tr>
        <tr>
          <td>change</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the change in the status of the launch point.</p>
            <p>Possible values are:</p>
            <ul>
              <li>added</li>
              <li>updated</li>
              <li>removed</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>favicon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Favorite icon image displayed for the website.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/listLaunchPoints &#39;{<br />
      &nbsp;&nbsp; &quot;subscribe&quot;:true<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp;&nbsp; &quot;subscribed&quot;:true,<br />
      &nbsp;&nbsp; &quot;launchPoints&quot;:[<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;id&quot;:&quot;bareapp&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;...&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; },<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;...&quot;<br />
      &nbsp;&nbsp; ],<br />
      &nbsp;&nbsp; &quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>addLaunchPoint</h3>
<div>
  <h4>Description</h4>
  <p>Adds a dynamic launchpoint. According to the information on launchpoint, application is displayed in the Launcher.</p>
  <p>If a parameter is not defined, SAM set the LP&#39;s parameter value same as appInfo&#39;s value.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application ID to be added.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the&nbsp;launchpoint ID to be added.</p>
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchpoint&nbsp;title.</p>
          </td>
        </tr>
        <tr>
          <td>icon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the icon image displayed for the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>bgImage</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the background image displayed to the user when the user hovers over the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>bgColor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the background color for the launchpoint.&nbsp;It will be displayed when the&nbsp;<strong>bgImage</strong>&nbsp;is not provided or unable to display. A color can be specified as a hex value or as a HTML color name.&nbsp;</p>
            <p>Format:&nbsp;color hex code (ex. #000000(black))&nbsp;</p>
            <p>http://www.color-hex.com/</p>
          </td>
        </tr>
        <tr>
          <td>imageForRecents</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the image displayed in the &quot;Recents&quot; tile.</p>
          </td>
        </tr>
        <tr>
          <td>iconColor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the background color for the application tile. The&nbsp;application&nbsp;tile is displayed in the Home, the Launcher, and the Recent screen.</p>
            <p>Format:&nbsp;color hex code (ex. #000000(black))&nbsp;</p>
            <p>http://www.color-hex.com/</p>
          </td>
        </tr>
        <tr>
          <td>largeIcon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the large icon (130x130 pixels) displayed in the top left corner of the screen, when the user hovers over an application tile in the Launcher.</p>
            <p><strong>Note</strong>: This file path is relative to the appinfo.json file.</p>
          </td>
        </tr>
        <tr>
          <td>appDescription</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates a brief description for the launchpoint.</p>
            <p><strong>Note</strong>: The&nbsp;<strong>appDescription&nbsp;</strong>cannot exceed 60 characters.</p>
          </td>
        </tr>
        <tr>
          <td>params</td>
          <td>Optional</td>
          <td>Object: <a href="#params"> params</a></td>
          <td>
            <p>If <strong>params</strong> is used, it should contain information on the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>bgImages</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p>Indicates the paths of the background images displayed to the user when the user hovers over the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>tileSize</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the tile size on UI.</p>
            <p>Possible values are</p>
            <ul>
              <li>normal</li>
              <li>large.&nbsp;</li>
            </ul>
            <p>Default:<strong> normal</strong></p>
            <p><strong>Note</strong>:</p>
            <ul>
              <li>The large tile hints that UI should make this tile larger than normal (2x).</li>
              <li>Usually, large size may be used for promotional application.&nbsp;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>unmovable</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the launchpoint position is movable or not.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: The launchpoint position cannot be moved by the user.</li>
              <li><strong>false</strong>: the launchpoint position can be moved by the user.</li>
            </ul>
            <p>Default: <strong>false</strong></p>
          </td>
        </tr>
        <tr>
          <td>userData</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the additional data that may be used for&nbsp;analytical purposes. The userData will be logged when the user interacts with it in Launcher.</p>
          </td>
        </tr>
        <tr>
          <td>policyCategory</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the category(group) of the launch point. The value should be the one of below mapping table.</p>
            <p><u>*$RESERVED_VALUE is for special callers to be controlled by LPM.</u></p>
            <table>
              <tbody>
                <tr>
                  <td>default</td>
                  <td>Any</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>*$RESERVED_VALUE</td>
                  <td>$RESERVED_LP</td>
                  <td>$RESERVED_POSITION</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope="col">
                    <p><strong>Value</strong></p>
                  </th>
                  <th scope="col">
                    <p><strong>Launch Point Type</strong></p>
                  </th>
                  <th scope="col">
                    <p><strong>position</strong></p>
                  </th>
                </tr>
              </thead>
              <thead>
              </thead>
            </table>
          </td>
        </tr>
        <tr>
          <td>supportI18nTitle</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <ul>
              <li>If&nbsp;<strong>&quot;supportI18nTitle&quot;</strong>&nbsp;is set to&nbsp;<strong>true</strong>, i18n will be supported for title when any information of this launch point is changed.</li>
              <li>If&nbsp;<strong>&quot;supportI18nTitle&quot;</strong>&nbsp;is set to&nbsp;<strong>false</strong>, i18n will be supported for title when any information of this launch point is changed.</li>
              <li>The default value of&nbsp;<strong>supportI18nTitle&nbsp;</strong>is&nbsp;<strong>true</strong></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>favicon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the paths of the favorite icon for the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>relaunch</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>If it is set to&nbsp;<strong>true</strong>, the app will be fresh-launched(re-randering)&nbsp;whenever user clicks the launchpoint.</p>
            <p><strong>Note</strong>: This parameter is deprecated in IvyLeague.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Indicates that the operation was successful.</li>
              <li><strong>false</strong>: Indicates that the operation failed. Check the &quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the&nbsp;launchpoint ID to be added.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;Error Codes&quot; section of this method for details.</p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>invalid json request</td>
          <td>
            <p>Invalid JSON request.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/addLaunchPoint &#39;{<br />
      &nbsp;&nbsp; &quot;id&quot;:&quot;com.webos.app.test&quot;,<br />
      &nbsp;&nbsp; &quot;title&quot;:&quot;TestLP&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp;&nbsp; &quot;launchPointId&quot;:&quot;178884&quot;,<br />
      &nbsp;&nbsp; &quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>updateLaunchPoint</h3>
<div>
  <h4>Description</h4>
  <p>Updates a dynamic launchpoint.</p>
  <p><strong>Note:</strong> If a user changes the HDMI application icon to another icon like a game icon using Input Manager on a TV, the HDMI application icon is dynamically&nbsp;<br />
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;changed to the new icon on the launcher.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the&nbsp;launchpoint ID to be updated.</p>
            <p><strong>Note</strong>: Both launchPointId and one or more parameters (title, icon, etc) need to be passed from service user.</p>
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the launchpoint&nbsp;title.</p>
          </td>
        </tr>
        <tr>
          <td>icon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the icon image displayed for the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>bgImage</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the background image displayed to the user when the user hovers over the launchpoint.</p>
            <p>Format:&nbsp;color hex code (ex. #000000(black))&nbsp;</p>
            <p>http://www.color-hex.com/</p>
          </td>
        </tr>
        <tr>
          <td>bgColor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the background color for the launchpoint.&nbsp;It will be displayed when the&nbsp;<strong>bgImage</strong>&nbsp;is not provided or unable to display. A color can be specified as a hex value or as a HTML color name.</p>
          </td>
        </tr>
        <tr>
          <td>imageForRecents</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the image displayed in the Recents tile.</p>
          </td>
        </tr>
        <tr>
          <td>iconColor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the background color for the application tile. The&nbsp;application&nbsp;tile is displayed in the Home, the Launcher, and the Recent screen.</p>
            <p>Format:&nbsp;color hex code (ex. #000000(black))&nbsp;</p>
            <p>http://www.color-hex.com/</p>
          </td>
        </tr>
        <tr>
          <td>largeIcon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the large icon (130x130 pixels) displayed in the top left corner of the screen, when the user hovers over an application tile in the Launcher.</p>
            <p><strong>Note</strong>: This file path is relative to the appinfo.json file.</p>
          </td>
        </tr>
        <tr>
          <td>appDescription</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates a brief description for the launchpoint.</p>
            <p><strong>Note</strong>: The <strong>appDescription&nbsp;</strong>cannot exceed 60 characters.</p>
          </td>
        </tr>
        <tr>
          <td>params</td>
          <td>Optional</td>
          <td>Object: <a href="#params"> params</a></td>
          <td>
            <p>If&nbsp;<strong>params</strong>&nbsp;is used, it should contain information on the launchpoint&nbsp;which will be passed to the application.</p>
          </td>
        </tr>
        <tr>
          <td>bgImages</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p>Indicates the paths of the background images displayed to the user when the user hovers over the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>tileSize</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the tile size on UI.</p>
            <p>Possible values are</p>
            <ul>
              <li>normal</li>
              <li>large.&nbsp;</li>
            </ul>
            <p>Default:<strong> normal</strong></p>
            <p><strong>Note</strong>:</p>
            <ul>
              <li>The large tile hints that UI should make this tile larger than normal (2x).</li>
              <li>Usually, large size may be used for promotional application.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>unmovable</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the launchpoint position is movable or not.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: The launchpoint position cannot be moved by the user.</li>
              <li><strong>false</strong>: the launchpoint position can be moved by the user.</li>
            </ul>
            <p>Default: <strong>false</strong></p>
          </td>
        </tr>
        <tr>
          <td>userData</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the additional data that may be used for&nbsp;analytical purposes.</p>
            <p><strong>Note</strong>: The userData will simply be logged when the user interacts with it in Launcher.</p>
          </td>
        </tr>
        <tr>
          <td>icons</td>
          <td>Optional</td>
          <td>Object array</td>
          <td>
            <p>Indicates the list of icon images.</p>
            <p><strong>Note</strong>: The icons will be shown in the launch point alternately.</p>
          </td>
        </tr>
        <tr>
          <td>favicon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the favorite icon image displayed for the website.</p>
          </td>
        </tr>
        <tr>
          <td>policyCategory</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicate a category(group) of the launch point. The value should be the one of below mapping table.</p>
            <p><u>*$RESERVED_VALUE is for special callers to be controlled by LPM.</u></p>
            <table align="left" border="1" cellpadding="1" cellspacing="1">
              <thead>
                <tr>
                  <th scope="col"><strong>Value</strong></th>
                  <th scope="col"><strong>Launch Point Type</strong></th>
                  <th scope="col"><strong>position</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>default</td>
                  <td>Any</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>*$RESERVED_VALUE</td>
                  <td>$RESERVED_LP</td>
                  <td>$RESERVED_POSITION</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>relaunch</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the target app is re-launched whenever the launch point is clicked. (Not fast-switching)</p>
            <p><strong>Note:</strong> This parameter is deprecated in IvyLeague.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Indicates that the operation was successful.</li>
              <li><strong>false</strong>: Indicates that the operation failed. Check the &quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;API Error Codes Reference&quot; section for more details.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>invalid json request</td>
          <td>
            <p>Invalid JSON request.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>cannot find launch point info</td>
          <td>
            <p>Cannot find launch point information for launchPointId.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/updateLaunchPoint &#39;{<br />
      &nbsp;&nbsp; &quot;launchPointId&quot;:&quot;178884&quot;,<br />
      &nbsp;&nbsp; &quot;title&quot;:&quot;Test&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp;&nbsp; &quot;returnValue&quot;:true<br />
      }</p>
  </div>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/updateLaunchPoint &#39;{<br />
      &nbsp;&nbsp; &quot;launchPointId&quot;:&quot;178884&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp;&nbsp; &quot;returnValue&quot;:false,<br />
      &nbsp;&nbsp; &quot;errorText&quot;:&quot;Insufficient parameters&quot;<br />
      }</p>
  </div>
</div>
<h3>removeLaunchPoint</h3>
<div>
  <h4>Description</h4>
  <p>Removes a dynamic launchpoint.</p>
  <p><strong>Note:</strong> It can cause application uninstall.</p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the launchpoint ID to be removed.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Indicates that the operation was successful.</li>
              <li><strong>false</strong>: Indicates that the operation failed. Check the &quot;errorCode&quot; and &quot;errorText&quot; fields for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;API Error Codes Reference&quot; section for more details.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>invalid json request</td>
          <td>
            <p>Invalid JSON request.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>cannot find launch point info</td>
          <td>
            <p>Cannot find launch point information for launchPointId.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.applicationmanager/removeLaunchPoint &#39;{<br />
      &nbsp;&nbsp; &quot;launchPointId&quot;:&quot;178884&quot;<br />
      }&#39;</p>
    <p>Response:</p>
    <p>{<br />
      &nbsp;&nbsp; &quot;returnValue&quot;:true<br />
      }</p>
  </div>
</div>
<h3>registerApp</h3>
<div>
  <h4>Description</h4>
  <p>Registers a native application.</p>
  <p><strong>Note:</strong></p>
  <ul>
    <li>This method <strong>should be called by launched&nbsp;native&nbsp;application</strong> to indicate if it is ready to receive several events.</li>
    <li>Each event is communicated via the ls message connection and the reply will be delivered only to the app that is performing the action.</li>
  </ul>
  <h4>Parameters</h4>
  <p>None</p>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> Indicates that the operation was successful.</li>
              <li><strong>false: </strong>Indicates that the operation failed.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>event</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>If a native application is successfully registered,&nbsp;<strong>event&nbsp;</strong>will contain&nbsp;<strong>registered</strong>.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>event</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>It indicates one of&nbsp;events&nbsp;the app should handle.</p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: Indicates that the operation was successful.</li>
              <li><strong>false</strong>:<strong> </strong>Indicates that the operation failed.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>parameters</td>
          <td>Optional</td>
          <td>Object: <a href="#params"> params</a></td>
          <td>
            <p>Indicates the information to be delivered to the registered&nbsp;app.</p>
          </td>
        </tr>
        <tr>
          <td>reason</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the app to be launched/closed.</p>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the <strong>ID</strong> of the registered app.&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -i -f luna://com.webos.service.applicationmanager/registerApp &#39;{}&#39;</p>
    <p>{</p>
    <p>&quot;event&quot;:&quot;registered&quot;,</p>
    <p>&quot;returnValue&quot;:true</p>
    <p>}</p>
    <p>&nbsp;</p>
    <p>//event is returned when an app status is changed.</p>
    <p>{</p>
    <p>&quot;event&quot;:&quot;pause&quot;,</p>
    <p>&quot;reason&quot;:&quot;keepAlive&quot;,</p>
    <p>&quot;parameters&quot;:{},</p>
    <p>&quot;returnValue&quot;:true</p>
    <p>}</p>
  </div>
</div>
<h3>lockApp</h3>
<div>
  <h4>Description</h4>
  <p>Locks an application.&nbsp;</p>
  <p><strong>Note:&nbsp;</strong></p>
  <ul>
    <li>Once it is locked, the application cannot be launched.</li>
    <li>This method is only called by <strong>appinstalld</strong>. Do not use this method in your application.</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application ID to be locked.</p>
          </td>
        </tr>
        <tr>
          <td>lock</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the application is locked.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true</strong>: The application is locked, set <strong>lock </strong>to <strong>true</strong>.&nbsp;If set to <strong>true</strong>, the application cannot be launched.</li>
              <li><strong>false</strong>: The application is unlocked.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:&nbsp;</strong>Indicates that the operation was successful.</li>
              <li><strong>false:&nbsp;</strong>Indicates that the operation failed. Check &quot;errorText&quot; field&nbsp;for details.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>locked</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates if the application is locked or unlocked.</p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true:</strong> The application is locked</li>
              <li><strong>false:</strong> The application is unlocked</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application ID which is locked or unlocked.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Indicates the reason for the failure of the operation. See the &quot;Error Codes&quot; section of this method for details.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>None</td>
          <td>Missing required key</td>
          <td>
            <p>Missing required key.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>Parameters &#39;id&#39;(string) or &#39;lock&#39;(bool) is missing</td>
          <td>
            <p>Parameters &#39;id&#39;(string) or &#39;lock&#39;(bool) is missing.</p>
          </td>
        </tr>
        <tr>
          <td>None</td>
          <td>was not found OR Unsupported Application Type</td>
          <td>
            <p>Was not found or an unsupported application type.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<h2>Objects</h2>
<div>
  <h3>appInfo</h3>
  <p>Contains the information about the application.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application ID.</p>
            <p><strong>Example</strong>: \&quot;com.newco.app.myApp\&quot;</p>
            <p><strong>Note</strong>:</p>
            <ul>
              <li>Every application has a unique ID, created from reverse DNS naming conventions.</li>
              <li>The launcher uses the ID to uniquely identify application and displays it with the title above.</li>
              <li>The application ID is unique,can only be set once, and cannot be changed after publishing the application.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>main</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the launchpoint of the application.</p>
            <p><strong>Note</strong>: This is a file path relative to the <strong>appinfo.json</strong> file and needs to point to an <strong>HTML</strong> file.</p>
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the application title as it is shown in the launcher and in the application window.</p>
            <p><strong>Note</strong>: The application title is unique, set once.</p>
          </td>
        </tr>
        <tr>
          <td>icon</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the path of the icon image displayed for the application.</p>
            <p><strong>Note</strong>: The file path is relative to the appinfo.json file. The default is \&quot;icon.png\&quot;</p>
          </td>
        </tr>
        <tr>
          <td>largeIcon</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The path of the large icon (130x130 pixels) displayed in the top left corner of the screen, when the user hovers over an application tile in the Launcher. This file path is relative to the appinfo.json file.</p>
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application type; web or pdk.</p>
          </td>
        </tr>
        <tr>
          <td>splashBackground</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The background image to be shown while application is loading, e.g., splash-background.png.</p>
          </td>
        </tr>
        <tr>
          <td>vendor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The application owner used in the launcher&nbsp;and deviceinfo dialogs.</p>
          </td>
        </tr>
        <tr>
          <td>transparent</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p><span style="line-height:1.6em">This indicates whether the web application&#39;s background is transparent or not.</span></p>
          </td>
        </tr>
        <tr>
          <td>version</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The application version number, in the dot-notation format, e.g., 3.0.2500.</p>
          </td>
        </tr>
        <tr>
          <td>handlesRelaunch</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>This indicates whether the application is relaunched or not when a user executes application that is already running.</p>
          </td>
        </tr>
        <tr>
          <td>requiredMemory</td>
          <td>Optional</td>
          <td>Number (int8_t)</td>
          <td>
            <p>The memory consumption is increasing quickly while&nbsp;launching. OOM can occur before system (Memory Manager) try to acquire adequate memory for the application.&nbsp;</p>
            <p>The requiredMemory&nbsp;describes the maximum usage of memory, in megabytes, while an application is launching. This is not same as the maximum memory usage while the application is running.</p>
          </td>
        </tr>
        <tr>
          <td>iconColor</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The background color for the application tile. The&nbsp;application&nbsp;tile is displayed in the Home, the Launcher, and the Recent screen.</p>
          </td>
        </tr>
        <tr>
          <td>appDescription</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>A short description for the application.&nbsp;The&nbsp;<strong>appDescription&nbsp;</strong>cannot exceed 60 characters.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>launchPoints</h3>
  <p>Contains the array of launchpoints.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>lptype</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The launchpoint type: default, bookmark, group.</p>
          </td>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application ID of the launchpoint.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The unique launchpoint ID.</p>
          </td>
        </tr>
        <tr>
          <td>removable</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>This indicates whether the application is removable or not.</p>
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application title as it is shown in the Launcher and in the application window. The application title is unique, set once.</p>
          </td>
        </tr>
        <tr>
          <td>icon</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The image displayed for the application.</p>
          </td>
        </tr>
        <tr>
          <td>iconColor</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The background color for the application tile. The application tile is displayed in the Home, the Launcher, and the Recent screen.</p>
          </td>
        </tr>
        <tr>
          <td>largeIcon</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The path of the large icon (130x130 pixels) displayed in the top left corner of the screen, when the user hovers over an application tile in the Launcher. This file path is relative to the appinfo.json file.</p>
          </td>
        </tr>
        <tr>
          <td>appDescription</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>A short description for the application.&nbsp;The&nbsp;<strong>appDescription&nbsp;</strong>cannot exceed 60 characters.</p>
          </td>
        </tr>
        <tr>
          <td>params</td>
          <td>Optional</td>
          <td>Object: <a href="#params"> params</a></td>
          <td>
            <p>The <strong>params&nbsp;</strong>object contains information on the target application.&nbsp;You should specify correct parameters for each application.</p>
          </td>
        </tr>
        <tr>
          <td>userData</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The additional data that may be used for&nbsp;analytical purposes. The userData will simply be logged when the user interacts with it in Launcher.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>params</h3>
  <p>Contains the parameters for the target application. Specify correct parameters for each application. As each application has different parameters, the parameters&nbsp;of params cannot be defined.</p>
  <h3>foregroundAppInfo</h3>
  <p>The object contains <span style="color:rgb(0, 0, 0)">sorted&nbsp;</span>foreground applications in ascending order.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>InstanceId of running application.</p>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application ID.</p>
          </td>
        </tr>
        <tr>
          <td>windowId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The window ID of the application running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The process ID of the application running in the foreground.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The display ID of application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>running</h3>
  <p>Indicates the object that contains the array of the&nbsp;running applications.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application ID.</p>
          </td>
        </tr>
        <tr>
          <td>launchPointId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The launch point ID of the app.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>instanceId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The instance ID of the app.</p>
          </td>
        </tr>
        <tr>
          <td>displayId</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The display ID of the app.</p>
          </td>
        </tr>
        <tr>
          <td>processId</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The process ID of the application.</p>
          </td>
        </tr>
        <tr>
          <td>webprocessid</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The webprocess ID of the application.</p>
          </td>
        </tr>
        <tr>
          <td>defaultWindowType</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The default window type of the application.</p>
            <p>Used by WAM (WebAppMgr) to launch a window with a&nbsp;special window type setting.</p>
            <p>The value will be one of the followings:</p>
            <ul>
              <li>card</li>
              <li>minimal</li>
              <li>overlay</li>
              <li>popup</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>appType</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>The application type.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<h2>API Error Codes Reference</h2>
<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <tbody>
      <tr>
        <th width="15%">
          <p>Error Code</p>
        </th>
        <th width="30%">
          <p>Error Text</p>
        </th>
        <th width="55%">
          <p>Error Description</p>
        </th>
      </tr>
      <tr>
        <td>None</td>
        <td>Missing required key</td>
        <td>
          <p>Missing required key.</p>
        </td>
      </tr>
      <tr>
        <td>None</td>
        <td>invalid json request</td>
        <td>
          <p>Invalid JSON request.</p>
        </td>
      </tr>
      <tr>
        <td>-102</td>
        <td>[ID] has been locked.</td>
        <td>
          <p>Application has been locked.</p>
        </td>
      </tr>
      <tr>
        <td>-203</td>
        <td>[ID] is already launching</td>
        <td>
          <p>The native application is already launching.</p>
        </td>
      </tr>
      <tr>
        <td>-312</td>
        <td>not allowed</td>
        <td>
          <p>EULA is not accepted.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
