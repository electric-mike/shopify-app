import {
  Card,
  Link,
  Heading
} from "@shopify/polaris";

export function ShortcodesInfoCard() {
  return (
    <Card sectioned>
      <div>
        <Heading>Shopify Shortcodes</Heading>
        <Link url="https://github.com/culturekings/shopify-shortcodes">Github Repo</Link>
        <br />
        <br />
        <p>The purpose of this project is to make advanced html usage available to store owners. This project can simplify galleries, faq, maps, videos and more for the store owner.</p>
        
        <ul>
        <li><a href="#syntax">Syntax</a></li>
        <li><a href="#accessing-variables-in-snippets">Accessing variables in snippets</a></li>
        <li><a href="#naming-convention">Naming convention</a></li>
        <li><a href="#examples">Examples</a></li>
        <li><a href="#activating-shortcodes">Activating shortcodes</a></li>
        <li><a href="#shortcode-fallback-display">Shortcode fallback display</a></li>
        <li><a href="#brackets-in-content">Brackets in content</a></li>
        </ul>
        <br />
        <Heading>Syntax</Heading>
        <p>So quickly some information on syntax. We have tried to keep the system consistent with Wordpress so an example tag is</p>
        <pre><code>[youtube width="800" height="500" video="M7lc1UVf-VE"]</code></pre>
        <br />
        <p>The first part is the snippet it is going to load and the rest are variables that you can use within the snippet</p>
        <p>The above example will load the snippet <code>shortcode-youtube.liquid</code> from your snippet folder.</p>
        <p>It will then pass the variables <code>width</code>, <code>height</code> and <code>video</code> with the respective values.</p>
        <br />
        <Heading>Activating shortcodes</Heading>
        <p>You must first copy <code>shortcode.liquid</code> and <code>shortcode-render.liquid</code> in to your snippets.</p>
        <p>To activate shortcode functionality a change to liquid tags is required where the functionality is required.</p>
        <pre><code>{'{{ page.content }}'}</code></pre>
        <p>Would need to be changed to</p>
        <pre><code>{'{% include \'shortcode\' load: page.content %}'}</code></pre>
        <br />
        <Heading>Accessing variables in snippets</Heading>
        <p>These variables are available to the snippet by using</p>
        <p>For easy reuse you can simply capture the result in to your own variable</p>
        <br />
        <Heading>Naming convention</Heading>
        <p>All shortcodes are prefixed in the file system with <code>shortcode-</code> so make sure that if you want a shortcode of <code>youtube</code> you create a <code>shortcode-youtube.liquid</code> file.</p>
        <p>The purpose of this is to allow store owners to easily find all active shortcodes within a store and avoid collisions with other snippets.</p>
        <br />
        <Heading>Shortcode fallback display</Heading>
        <p>As shopify data can be sent to external applications and used in places where the shortcode is unable to render an optional syntax is available.</p>
        <p>It plays on the fact the display of the data will more than likely be in a HTML page and uses the default HTML comment tag to hide the shortcode in places where it has not been rendered.</p>
        <pre><code><span>&lt;!--[youtube width="800" height="500" video="M7lc1UVf-VE"]--&gt;</span>
        </code></pre><p>Using this syntax will however hide it from the WYISWYG editor and make editing by store owners more difficult.</p>
        <br />
        <Heading>Brackets in content</Heading>
        <p>You may be thinking what happens if I have square brackets in other parts of my content. Not to worry the plugin will only replace square bracket content if it finds an active shortcode. For example</p>
        <pre><code>[ Random Content ]</code></pre>
        <p>The above won&#39;t be replaced with new content unless a shortcode with the name Random exists. There are rare cases when the word you use is a shortcode and this will need to be fixed manually such as</p>
        <pre><code>[ youtube is a great channel ]</code></pre>
        <p>Would need to be replaced by something such as</p>
        <pre><code><span>( youtube is a great channel )</span>
        </code></pre>
      </div>
    </Card> 
  )
}